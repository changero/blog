function bind() {
  const fn = arguments[0];
  const context = arguments[1];
  const bindProp = [...arguments].slice(2);
  return function() {
    fn.apply(context, [...bindProp, ...arguments]);
  };
}

function t(a) {
  console.log(this.a, a);
}

const t2 = bind(t, { a: "2" }, 1);

t2();
