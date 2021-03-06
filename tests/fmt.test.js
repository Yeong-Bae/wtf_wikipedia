'use strict';
var test = require('tape');
var wtf = require('./lib');

test('bold/italics', t => {
  var str = `'''K. Nicole Mitchell''' is ''currently'' a [[U.S. Magistrate Judge]].

	She is '''''very''''' good`;
  var sentence = wtf.parse(str).sections[0].sentences[0];
  t.deepEqual(sentence.fmt.bold, ['K. Nicole Mitchell'], 'one bold');
  t.deepEqual(sentence.fmt.italic, ['currently'], 'one italic');
  t.equal(sentence.links.length, 1, 'one link');

  sentence = wtf.parse(str).sections[0].sentences[1];
  t.deepEqual(sentence.fmt.bold, ['very'], 'one bold');
  t.deepEqual(sentence.fmt.italic, ['very'], 'one italic');
  t.end();
});

test('inline mixquotes test', t => {
  var str = `this is ''''four'''' and this is '''''five'''''`;
  var sentence = wtf.parse(str).sections[0].sentences[0];
  // t.deepEqual(sentence.fmt.bold, ['five', '\'four\''], 'two bold');
  t.deepEqual(sentence.fmt.italic, ['five'], 'five is italic');
  t.end();
});
