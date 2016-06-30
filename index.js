import postcss from 'postcss';
import parser from 'postcss-selector-parser';

function transformNode(selectors, selector, selectorIndex, nodeIndex = 0) {
  const node = selector.nodes[nodeIndex];

  if (node && node.value === ':any-button') {
    const button = selector.clone();
    const inputButton = selector.clone();
    const inputReset = selector.clone();
    const inputSubmit = selector.clone();
    button.nodes[nodeIndex].value = 'button';
    inputButton.nodes[nodeIndex].value = 'input[type="button"]';
    inputReset.nodes[nodeIndex].value = 'input[type="reset"]';
    inputSubmit.nodes[nodeIndex].value = 'input[type="submit"]';
    selectors.nodes.splice(selectorIndex, 1, button, inputButton, inputReset, inputSubmit);
  } else if (node) {
    transformNode(selectors, selector, selectorIndex, nodeIndex + 1);
  }
}

function transformSelector(selectors, selectorIndex = 0) {
  const selector = selectors.nodes[selectorIndex];

  if (selector) {
    transformNode(selectors, selector, selectorIndex);
    transformSelector(selectors, selectorIndex + 1);
  }
}

export default postcss.plugin('postcss-pseudo-class-any-button', () =>
  style => new Promise(resolve => {
    style.walkRules(rule => {
      const selector = parser(transformSelector).process(rule.selector).result;

      /* eslint-disable no-param-reassign */
      if (selector !== rule.selector) rule.selector = selector;
    });

    resolve();
  })
);
