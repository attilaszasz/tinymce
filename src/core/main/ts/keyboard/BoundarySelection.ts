/**
 * BoundarySelection.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import { Arr } from '@ephox/katamari';
import { Cell } from '@ephox/katamari';
import { Fun } from '@ephox/katamari';
import CaretContainerRemove from '../caret/CaretContainerRemove';
import CaretPosition from '../caret/CaretPosition';
import BoundaryCaret from './BoundaryCaret';
import BoundaryLocation from './BoundaryLocation';
import InlineUtils from './InlineUtils';
import WordSelection from '../selection/WordSelection';

const setCaretPosition = function (editor, pos) {
  const rng = editor.dom.createRng();
  rng.setStart(pos.container(), pos.offset());
  rng.setEnd(pos.container(), pos.offset());
  editor.selection.setRng(rng);
};

const isFeatureEnabled = function (editor) {
  return editor.settings.inline_boundaries !== false;
};

const setSelected = function (state, elm) {
  if (state) {
    elm.setAttribute('data-mce-selected', 'inline-boundary');
  } else {
    elm.removeAttribute('data-mce-selected');
  }
};

const renderCaretLocation = function (editor, caret, location) {
  return BoundaryCaret.renderCaret(caret, location).map(function (pos) {
    setCaretPosition(editor, pos);
    return location;
  });
};

const findLocation = function (editor, caret, forward) {
  const rootNode = editor.getBody();
  const from = CaretPosition.fromRangeStart(editor.selection.getRng());
  const isInlineTarget = Fun.curry(InlineUtils.isInlineTarget, editor);
  const location = BoundaryLocation.findLocation(forward, isInlineTarget, rootNode, from);
  return location.bind(function (location) {
    return renderCaretLocation(editor, caret, location);
  });
};

const toggleInlines = function (isInlineTarget, dom, elms) {
  const selectedInlines = Arr.filter(dom.select('*[data-mce-selected="inline-boundary"]'), isInlineTarget);
  const targetInlines = Arr.filter(elms, isInlineTarget);
  Arr.each(Arr.difference(selectedInlines, targetInlines), Fun.curry(setSelected, false));
  Arr.each(Arr.difference(targetInlines, selectedInlines), Fun.curry(setSelected, true));
};

const safeRemoveCaretContainer = function (editor, caret) {
  if (editor.selection.isCollapsed() && editor.composing !== true && caret.get()) {
    const pos = CaretPosition.fromRangeStart(editor.selection.getRng());
    if (CaretPosition.isTextPosition(pos) && InlineUtils.isAtZwsp(pos) === false) {
      setCaretPosition(editor, CaretContainerRemove.removeAndReposition(caret.get(), pos));
      caret.set(null);
    }
  }
};

const renderInsideInlineCaret = function (isInlineTarget, editor, caret, elms) {
  if (editor.selection.isCollapsed()) {
    const inlines = Arr.filter(elms, isInlineTarget);
    Arr.each(inlines, function (inline) {
      const pos = CaretPosition.fromRangeStart(editor.selection.getRng());
      BoundaryLocation.readLocation(isInlineTarget, editor.getBody(), pos).bind(function (location) {
        return renderCaretLocation(editor, caret, location);
      });
    });
  }
};

const move = function (editor, caret, forward) {
  return function () {
    return isFeatureEnabled(editor) ? findLocation(editor, caret, forward).isSome() : false;
  };
};

const moveWord = function (forward, editor, caret) {
  return function () {
    return isFeatureEnabled(editor) ? WordSelection.moveByWord(forward, editor) : false;
  };
};

const setupSelectedState = function (editor) {
  const caret = new Cell(null);
  const isInlineTarget = Fun.curry(InlineUtils.isInlineTarget, editor);

  editor.on('NodeChange', function (e) {
    if (isFeatureEnabled(editor)) {
      toggleInlines(isInlineTarget, editor.dom, e.parents);
      safeRemoveCaretContainer(editor, caret);
      renderInsideInlineCaret(isInlineTarget, editor, caret, e.parents);
    }
  });

  return caret;
};

export default {
  move,
  moveNextWord: Fun.curry(moveWord, true),
  movePrevWord: Fun.curry(moveWord, false),
  setupSelectedState,
  setCaretPosition
};