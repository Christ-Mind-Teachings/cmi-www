/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
'use strict';

mejs.i18n.en['mejs.prevp'] = 'Previous Paragraph';

Object.assign(mejs.MepDefaults, {
  prevpText: null
});

Object.assign(MediaElementPlayer.prototype, {
  buildprevp: function buildprevp(player, controls, layers, media) {
    var t = this,
        prevpTitle = mejs.Utils.isString(t.options.prevpText) ? t.options.prevpText : mejs.i18n.t('mejs.prevp'),
        button = document.createElement('div');

    button.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'prevp-button ' + t.options.classPrefix + 'prevp';
    button.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + prevpTitle + '" aria-label="' + prevpTitle + '" tabindex="0"></button>';

    t.addControlElement(button, 'prevp');

    button.addEventListener('click', function () {
      if (player.paused) {
        return;
      }
      var event = mejs.Utils.createEvent('prevp', media);
      media.dispatchEvent(event);
    });
  }
});

},{}]},{},[1]);
