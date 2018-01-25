const XmlBuilder = require('./builders/XmlBuilder');

const { Company, Branch } = require('../../models');

const builders = {
  xml: XmlBuilder
};

function ExportData(type) {
  return new Promise(async (res, rej) => {
    try {
      const companies = await Company.findAll({
        include: [{ model: Branch }]
      });
      const data = companies.map(company => ({
        ...company.dataValues,
        createdAt: company.createdAt.toISOString(),
        updatedAt: company.updatedAt.toISOString(),
        Branches: company.Branches.map(branch => ({
          ...branch.dataValues,
          createdAt: branch.createdAt.toISOString(),
          updatedAt: branch.updatedAt.toISOString()
        }))
      }));
      const defaultBuilder = 'xml';
      const builder = builders[type];

      res({
        result: builder
          ? builder(data)
          : builders[defaultBuilder](data),
        type: builder ? type : defaultBuilder
      });
    } catch (e) {
      rej(e);
    }
  });
}

module.exports = ExportData;
