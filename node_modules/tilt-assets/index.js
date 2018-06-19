
const Asset = require('./lib/asset');

module.exports = asset;
asset.Asset = Asset;

function asset(options) {
  return new Asset(options);
}
