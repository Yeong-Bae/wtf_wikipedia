#!/usr/bin/env node

'use strict';
var wtf = require('../src/index');

var title = process.argv.slice(2, process.argv.length).join(' ');
if (!title) {
  throw new Error('Usage: node plaintext.js Toronto Blue Jays');
}
title = title.charAt(0).toUpperCase() + title.slice(1);
//fetch this topic's wikipedia page
wtf.from_api(title, 'en', function (script, page_identifier, lang_or_wikiid) {
  var o = {
    page_identifier:page_identifier,
    lang_or_wikiid:lang_or_wikiid
  };

  var data = wtf.plaintext(script, o);
  console.log(data);
});
