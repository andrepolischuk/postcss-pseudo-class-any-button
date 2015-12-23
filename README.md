# postcss-pseudo-class-any-button [![Build Status][travis-image]][travis-url]

> [PostCSS][postcss] plugin for targeting all button elements with `:any-button` selector

```css
/* before */

.form :any-button {
  border: 0;
}

/* after */

.form button,
.form input[type="button"],
.form input[type="reset"],
.form input[type="submit"] {
  border: 0;
}
```


## Install

```sh
npm install --save-dev postcss-pseudo-class-any-button
```

## Usage

```js
var fs = require('fs');
var postcss = require('postcss');
var anyButton = require('postcss-pseudo-class-any-button');
var css = fs.readFileSync('input.css', 'utf8');

var output = postcss([anyButton])
  .process(css)
  .css;
```

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/postcss-pseudo-class-any-button
[travis-image]: https://travis-ci.org/andrepolischuk/postcss-pseudo-class-any-button.svg?branch=master

[postcss]: https://github.com/postcss/postcss
