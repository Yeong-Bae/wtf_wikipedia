const smartReplace = require('../lib').smartReplace;

// create links, bold, italic in html
const doSentence = function(sentence, options) {
  let text = sentence.text;
  //turn links back into links
  if (sentence.links && options.links === true) {
    sentence.links.forEach((link) => {
      let href = '';
      let classNames = 'link';
      if (link.site) {
        //use an external link
        href = link.site;
        classNames += ' external';
      } else {
        //otherwise, make it a relative internal link
        href = link.page || link.text;
        href = './' + href.replace(/ /g, '_');
      }
      let tag = '\\href{' + href + '}{' + link.text + '}';
      text = smartReplace(text, link.text, tag);
    });
  }
  if (sentence.fmt) {
    if (sentence.fmt.bold) {
      sentence.fmt.bold.forEach((str) => {
        let tag = '\\textbf{' + str + '}';
        text = smartReplace(text, str, tag);
      });
    }
    if (sentence.fmt.italic) {
      sentence.fmt.italic.forEach((str) => {
        let tag = '\\textit' + str + '}';
        text = smartReplace(text, str, tag);
      });
    }
  }
  return text;
};
module.exports = doSentence;
