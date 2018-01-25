const faker = require('faker');
const cnpj = require('node-cnpj');

const { Company, Branch } = require('../models');

module.exports = {
  up: () =>
    Company.bulkCreate(
      [...new Array(10)].map(() => ({
        cnpjBase: cnpj.generate().slice(0, 8),
        status: faker.random.boolean(),
        razaoSocial: faker.company.companyName(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      })),
      {}
    ).then(async () => {
      const companies = await Company.findAll({ where: {} });
      const bulk = companies
        .map(company =>
          [...new Array(10)].map((x, i) => ({
            CompanyId: company.id,
            status: faker.random.boolean(),
            cnpj: `${company.cnpjBase}${100000 + i}`,
            city: faker.address.city(),
            state: faker.address.state(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
          }))
        )
        .reduce((array, result) => [...array, ...result], []);
      await Branch.bulkCreate(bulk);
    }),

  down: queryInterface => [
    queryInterface.bulkDelete(`Companies`, {}),
    queryInterface.bulkDelete(`Branches`, {})
  ]
};
