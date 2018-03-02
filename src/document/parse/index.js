const redirects = require('./page/redirects');
const disambig = require('./page/disambig');
const preProcess = require('./preProcess');
const postProcess = require('./postProcess');
const parse = {
  section: require('./section'),
  templates: require('./templates'),
  categories: require('./categories')
};

//convert wikiscript markup lang to json
const main = function(wiki, options) {
  options = options || {};
  wiki = wiki || '';
  //detect if page is just redirect, and return
  if (redirects.is_redirect(wiki) === true) {
    return redirects.parse_redirect(wiki);
  }
  //detect if page is just disambiguator page, and return
  if (disambig.is_disambig(wiki) === true) {
    return disambig.parse_disambig(wiki);
  }
  let r = {
    type: 'page',
    sections: [],
    infoboxes: [],
    interwiki: {},
    categories: [],
    coordinates: [],
    citations: []
  };
  if (options.custom) {
    r.custom = {};
  }
  if (options.page_identifier) {
    r.page_identifier = options.page_identifier;
  }
  if (options.lang_or_wikiid) {
    r.lang_or_wikiid = options.lang_or_wikiid;
  }
  //give ourselves a little head-start
  wiki = preProcess(r, wiki, options);
  //pull-out infoboxes and stuff
  wiki = parse.templates(r, wiki, options);
  //pull-out [[category:whatevers]]
  if (options.categories !== false) {
    wiki = parse.categories(r, wiki);
  }
  //parse all the headings, and their texts/sentences
  r.sections = parse.section(r, wiki, options) || [];

  r = postProcess(r);

  return r;
};

module.exports = main;