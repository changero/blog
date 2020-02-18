---
title: https证书
date: 2020-02-18
categories:
  - 
tags:
  - 
---

## 关于证书的一些基本概念

- key、私钥，用于创建CSR、以及证书验证的密钥

- CSR、证书申请文件，通过提交CSR到CA，由CA经过验证之后颁发证书

- CA、颁发证书的机构

- cert、证书文件，也就是我们要创建的HTTPS服务器所需要携带的文件

一般证书的流程是，在本机生成key，再通过key生成CSR文件，将CSR文件提交到CA之后，由CA验证你的域名使用权之后即可下载证书文件，得到证书文件之后，在启动服务器的时候将key密钥文件，以及cert证书文件添加到服务器参数上（视具体服务器情况来定）。之后，当有人打开浏览器浏览到你的服务之后，如果浏览器信任你获得证书的CA，那么就会在网址旁边显示一把小锁。

其实说白了，这一系列就是一个信任链，用户使用浏览器就表示用户信任这个浏览器，而浏览器信任CA，CA信任你的服务，那么就代表用户信任了你的服务。所以对于本地开发的服务而言，要想正确显示证书，只需要将CA的证书导入到浏览器就行了

下面就是关于生成本地证书的方式

1、创建自己的CA机构

2、创建服务器端证书

3、创建客户端证书

4、将证书打包

<!-- more -->

## 一、创建自己的CA机构

- 为CA生成私钥
```
openssl genrsa -out ca-key.pem -des 1024
```
- 通过CA私钥生成CSR
```
openssl req -new -key ca-key.pem -out ca-csr.pem
```

- 通过CSR文件和私钥生成CA证书
```
openssl x509 -req -in ca-csr.pem -signkey ca-key.pem -out ca-cert.pem
```

### 可能会遇到的问题

> 你需要root或者admin的权限
Unable to load config info from /user/local/ssl/openssl.cnf
对于这个问题，你可以从网上下载一份正确的openssl.cnf文件，
然后set OPENSSL_CONF=openssl.cnf文件的本地路径

## 二、创建服务器端证书

- 为服务器生成私钥
```
openssl genrsa -out server-key.pem 1024
```
- 利用服务器私钥文件服务器生成CSR
```
openssl req -new -key server-key.pem -config openssl.cnf -out server-csr.pem
```
这一步非常关键，你需要指定一份openssl.cnf文件。可以用这个
```
[req]  
    distinguished_name = req_distinguished_name  
    req_extensions = v3_req  
  
    [req_distinguished_name]  
    countryName = Country Name (2 letter code)  
    countryName_default = CN  
    stateOrProvinceName = State or Province Name (full name)  
    stateOrProvinceName_default = BeiJing  
    localityName = Locality Name (eg, city)  
    localityName_default = YaYunCun  
    organizationalUnitName  = Organizational Unit Name (eg, section)  
    organizationalUnitName_default  = Domain Control Validated  
    commonName = Internet Widgits Ltd  
    commonName_max  = 64  
  
    [ v3_req ]  
    # Extensions to add to a certificate request  
    basicConstraints = CA:FALSE  
    keyUsage = nonRepudiation, digitalSignature, keyEncipherment  
    subjectAltName = @alt_names  
  
    [alt_names]  
	#注意这个IP.1的设置，IP地址需要和你的服务器的监听地址一样
    IP.1 = 127.0.0.1
```
- 通过服务器私钥文件和CSR文件生成服务器证书
```
openssl x509 -req -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -in server-csr.pem -out server-cert.pem -extensions v3_req -extfile openssl.cnf
```
## 三、创建客户端证书
- 生成客户端私钥
```
openssl genrsa -out client-key.pem
```
- 利用私钥生成CSR
```
openssl req -new -key client-key.pem -out client-csr.pem
```
- 生成客户端证书
```
openssl x509 -req -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -in client-csr.pem -out client-cert.pem
```

### HTTPS 服务器代码

```js
var https = require('https');
var fs = require('fs');

var options = {
	key: fs.readFileSync('./keys/server-key.pem'),
	ca: [fs.readFileSync('./keys/ca-cert.pem')],
	cert: fs.readFileSync('./keys/server-cert.pem')
};

https.createServer(options,function(req,res){
	res.writeHead(200);
	res.end('hello world\n');
}).listen(3000,'127.0.0.1');
```

### HTTPS 客户端代码

```js
var https = require('https');
var fs = require('fs');

var options = {
	hostname:'127.0.0.1',
	port:3000,
	path:'/',
	method:'GET',
	key:fs.readFileSync('./keys/client-key.pem'),
	cert:fs.readFileSync('./keys/client-cert.pem'),
	ca: [fs.readFileSync('./keys/ca-cert.pem')],
	agent:false
};

options.agent = new https.Agent(options);
var req = https.request(options,function(res){
console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);
	res.setEncoding('utf-8');
	res.on('data',function(d){
		console.log(d);
	})
});

req.end();

req.on('error',function(e){
	console.log(e);
})
```

## 四、将证书打包
- 打包服务器端证书
```
openssl pkcs12 -export -in server-cert.pem -inkey server-key.pem -certfile ca-cert.pem -out server.pfx
```
- 打包客户端证书
```
openssl pkcs12 -export -in client-cert.pem -inkey client-key.pem -certfile ca-cert.pem -out client.pfx
```

## 其他

生成本地证书一系列文件的[脚本](https://gist.githubusercontent.com/bjanderson/075fadfccdd12623ab935e57eff58eb4/raw/7fa04d5fb967f39c626303806395133e7f2ac3f2/generate-certificates.sh)、生成Let’s Encrypt证书的[acme脚本](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)

### 免费证书申请的网站

1、[freessl.cn](https://freessl.cn/)，由多种证书可以申请

2、[certmall.trustauth.cn](https://certmall.trustauth.cn/Free)，申请Let’s Encrypt证书

3、[sslforfree.com](https://www.sslforfree.com/)

4、[CSR在线制作](https://www.chinassl.net/ssltools/generator-csr.html)与[申请](https://www.chinassl.net/ssltools/free-ssl.html)