import test from 'ava';
import postcss from 'postcss';
import anyButton from './index.es5';

test('return original', async t => {
  const res = await transform('button { border: 0; }');
  t.is(res.warnings().length, 0);
  t.is(res.css, 'button { border: 0; }');
});

test('return fixed', async t => {
  const res = await transform(':any-button { border: 0; }');
  t.is(res.warnings().length, 0);
  t.is(res.css, 'button,input[type="button"],input[type="reset"],input[type="submit"] { border: 0; }');
});

test('return fixed for mixed usage', async t => {
  const res = await transform(':any-button, .form :any-button { border: 0; }');
  t.is(res.warnings().length, 0);
  t.is(res.css, 'button,input[type="button"],input[type="reset"],input[type="submit"], .form button, .form input[type="button"], .form input[type="reset"], .form input[type="submit"] { border: 0; }');
});

function transform(input) {
  return postcss([anyButton]).process(input);
}
