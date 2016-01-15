import postcss from 'postcss';
import parser from 'postcss-selector-parser';

export default postcss.plugin('postcss-pseudo-class-any-button', () =>
  style => new Promise(resolve => {
    style.walkRules(rule => {
      var selector = parser(transform).process(rule.selector).result;
      if (selector !== rule.selector) rule.selector = selector;
    });

    resolve();
  })
);

function transform(selectors) {
  let button;
  let inputButton;
  let inputReset;
  let inputSubmit;
  let node;
  let nodeIndex;
  let selector;
  let selectorIndex = -1;

  while (selector = selectors.nodes[++selectorIndex]) {
    nodeIndex = -1;

    while (node = selector.nodes[++nodeIndex]) {
      if (node.value === ':any-button') {
        button = selector.clone();
        inputButton = selector.clone();
        inputReset = selector.clone();
        inputSubmit = selector.clone();
        button.nodes[nodeIndex].value = 'button';
        inputButton.nodes[nodeIndex].value = 'input[type="button"]';
        inputReset.nodes[nodeIndex].value = 'input[type="reset"]';
        inputSubmit.nodes[nodeIndex].value = 'input[type="submit"]';
        selectors.nodes.splice(selectorIndex--, 1, button, inputButton, inputReset, inputSubmit);
        break;
      }
    }
  }

  return selector;
}
