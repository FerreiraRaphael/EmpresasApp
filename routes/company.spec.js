const Bluebird = require('bluebird');
const request = require('supertest');
const expect = require('expect.js');
const httpStatus = require('http-status');
const CNPJ = require('node-cnpj');

const app = require('../app');
const models = require('../models');
const { CreateCompanyAndBranch } = require('../services/company');

const { Company, Branch } = models;

describe('Route api/v1/company', () => {
  before(() => models.sequelize.sync());
  beforeEach(() =>
    Bluebird.all([
      Company.destroy({
        where: {}
      }),
      Branch.destroy({
        where: {}
      })
    ])
  );
  const validCNPJ = CNPJ.generate();
  const validData = {
    razaoSocial: 'Empresas App',
    cnpj: validCNPJ,
    status: true,
    branchStatus: true,
    city: 'Goiania',
    state: 'Goias'
  };

  describe('POST api/v1/company', () => {
    it("creates a company and it's initial branch", async () => {
      await request(app)
        .post('/api/v1/company')
        .set('Accept', /application\/json/)
        .send(validData)
        .expect(httpStatus.OK);
      const companyCount = await Company.count();
      const branchCount = await Branch.count();
      expect(companyCount).to.be(1);
      expect(branchCount).to.be(1);
    });

    it('fails to create company with invalid cnpj', async () => {
      await request(app)
        .post('/api/v1/company')
        .set('Accept', /application\/json/)
        .send({
          ...validData,
          cnpj: '1234567890123'
        })
        .expect(httpStatus.BAD_REQUEST);
      const companyCount = await Company.count();
      const branchCount = await Branch.count();
      expect(companyCount).to.be(0);
      expect(branchCount).to.be(0);
    });

    it('fails to create company same cnpj', async () => {
      await CreateCompanyAndBranch(validData);
      await request(app)
        .post('/api/v1/company')
        .set('Accept', /application\/json/)
        .send(validData)
        .expect(httpStatus.BAD_REQUEST);
      const companyCount = await Company.count();
      expect(companyCount).to.be(1);
    });
  });

  describe('PUT api/vi/company/:CompanyId', () => {
    it('updates the company', async () => {
      const { company } = await CreateCompanyAndBranch(validData);
      await request(app)
        .put(`/api/v1/company/${company.id}`)
        .set('Accept', /application\/json/)
        .send({
          razaoSocial: 'APP'
        })
        .expect(httpStatus.OK);
      await company.reload();
      expect(company.razaoSocial).to.be('APP');
    });
  });

  describe('DELETE api/vi/company/:CompanyId', () => {
    it('deletes the company and its branchs', async () => {
      const { company } = await CreateCompanyAndBranch(validData);
      await request(app)
        .delete(`/api/v1/company/${company.id}`)
        .set('Accept', /application\/json/)
        .send()
        .expect(httpStatus.OK);
      const companyCount = await Company.count();
      const branchCount = await Branch.count();
      expect(companyCount).to.be(0);
      expect(branchCount).to.be(0);
    });
  });
});
