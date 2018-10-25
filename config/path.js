const path = require('path');

const root = process.cwd();
const build = path.resolve(root, 'build');
const src = path.resolve(root, 'src');
const views = path.resolve(root, 'src/Views');
const constants = path.resolve(root, 'src/Constants');
const components = path.resolve(root, 'src/Components');
const assets = path.resolve(root, 'src/Assets');
const api = path.resolve(root, 'src/Api');
const state = path.resolve(root, 'src/State');
const utils = path.resolve(root, 'src/Utils');

module.exports = {
  root,
  build,
  src,
  views,
  constants,
  components,
  assets,
  api,
  state,
  utils
};
