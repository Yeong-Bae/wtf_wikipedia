const doSentence = require('./sentence');
const doTable = require('./table');
const makeImage = require('./image');

const doList = (list) => {
  let html = '<ul>\n';
  list.forEach((o) => {
    html += '  <li>' + o.text + '</li>\n';
  });
  html += '<ul>\n';
  return html;
};

const doSection = (section, options) => {
  let html = '';
  //make the header
  if (options.title === true && section.title) {
    let num = 1 + section.depth;
    html += '  <h' + num + '>' + section.title + '</h' + num + '>';
    html += '\n';
  }
  //put any images under the header
  if (section.images() && options.images === true) {
    html += section.images().map((image) => makeImage(image)).join('\n');
    html += '\n';
  }
  //make a html table
  if (section.tables() && options.tables === true) {
    html += section.tables().map((t) => doTable(t, options)).join('\n');
  }
  // //make a html bullet-list
  if (section.lists() && options.lists === true) {
    html += section.lists().map((list) => doList(list, options)).join('\n');
  }
  //finally, write the sentence text.
  if (section.sentences() && options.sentences === true) {
    html += '  <p>' + section.sentences().map((s) => doSentence(s, options)).join(' ') + '</p>';
    html += '\n';
  }
  return '<div class="section">\n' + html + '</div>\n';
};
module.exports = doSection;