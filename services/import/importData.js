const XmlParser = require('./parsers/XmlParser');

const parsers = {
  xml: XmlParser
};

function ImportData(data, type) {
  return new Promise(async (res, rej) => {
    try {
      const defaultParser = 'xml';
      const parser = parsers[type];
      const result = await (parser
        ? parser(data)
        : parsers[defaultParser](data));
      res(result);
    } catch (e) {
      rej(e);
    }
  });
}

module.exports = ImportData;
