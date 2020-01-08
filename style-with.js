'use strict';


function getStyleParent() {
  let doc = window.document;
  return doc.head || doc.body || doc.lastElementChild;
}


function insertStyles(selector, css, parentNode) {
  if (!parentNode) {
    parentNode = getStyleParent();
  }

  let doc = parentNode.ownerDocument;
  let elem = doc.createElement('style');

  if (selector) {
    elem.dataset.selector = selector;
  }

  parentNode.appendChild(elem);
  elem.sheet.disabled = true;
  elem.appendChild(doc.createTextNode(css));

  if (selector) {
    for (let rule of elem.sheet.cssRules) {
      if (rule.selectorText) {
        rule.selectorText = selector + ' ' + rule.selectorText;
      }
    }
  }

  elem.sheet.disabled = false;
}


class Sheet {

  constructor(text) {
    this._text = text;
    this._lastSelector = undefined;
    this._appliedSet = undefined;
  }

  style(selector, parentNode) {
    if (!selector) {
      selector = null;
    }

    if (selector === this._lastSelector) {
      return;
    }

    this._lastSelector = selector;

    if (!this._appliedSet.has(selector)) {
      this._appliedSet.add(selector);
      insertStyles(selector, this._text, parentNode);
    }
  }

}


function css(literal, ...values) {
  return new Sheet(String.raw(literal, ...values));
}


function style(selector) {
  return {
    with(sheet, parentNode) { sheet.style(selector, parentNode); }
  };
}


module.exports = { style, css };
