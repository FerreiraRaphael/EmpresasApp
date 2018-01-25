const { parseString } = require('xml2js');

function XmlParser(data) {
  return new Promise((res, rej) => {
    parseString(data, { explicitArray: false }, (err, result) => {
      if (err) {
        return rej(err);
      }
      return res(result.root.companies);
    });
  });
}

module.exports = XmlParser;
