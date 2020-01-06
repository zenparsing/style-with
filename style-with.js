'use strict';

function getDocument() {
  return window.document;
}

function getStyleParent() {
  let doc = getDocument();
  return doc.head || doc.body || doc.lastElementChild;
}


class Sheet {

  constructor(selector, css) {
    this._selector = selector;
    this._css = css;
    this._applied = false;
  }

  apply(parentNode) {
    if (this._applied) {
      return;
    }

    if (!parentNode) {
      parentNode = getStyleParent();
    }

    this._applied = true;
    let doc = parentNode.ownerDocument;
    let elem = doc.createElement('style');

    if (this._selector) {
      elem.dataset.selector = this._selector;
    }

    parentNode.appendChild(elem);
    elem.sheet.disabled = true;
    elem.appendChild(doc.createTextNode(this._css));

    for (let rule of elem.sheet.cssRules) {
      if (this._selector && rule.selectorText) {
        rule.selectorText = this._selector + ' ' + rule.selectorText;
      }
    }

    elem.sheet.disabled = false;
  }

}


class StyleWith {

  constructor(selector) {
    this._selector = selector;
  }

  css(literal, ...values) {
    return new Sheet(this._selector, String.raw(literal, ...values));
  }

  with(css) {
    if (typeof css !== 'string') {
      throw new TypeError('Argument not a string');
    }
    return new Sheet(this._selector, css);
  }

}


function style(selector) {
  return new StyleWith(selector);
}

module.exports = { style };
