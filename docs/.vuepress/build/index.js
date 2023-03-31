const { buildWithSUrge } = require('./env');
const fs = require('fs');
const path = require('path');
module.exports = {
  [buildWithSUrge]: {
    dest: '.vuepress/surge',
    cname: 'blog.bianqu.tk',
  },
  [!buildWithSUrge]: {
    dest: '.vuepress/dist',
    cname: 'blog.bianqu.cf',
  },
  rewriteCname(cname) {
    fs.writeFileSync(path.join(__dirname, '../public/CNAME'), cname, {
      flag: 'w',
    });
  },
};
