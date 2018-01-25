const builder = require('xmlbuilder');

function XmlBuilder(data) {
  const xml = builder.create(
    { root: { companies: data } },
    { encoding: 'utf-8' }
  );
  return xml.end({ pretty: true });
}

module.exports = XmlBuilder;
