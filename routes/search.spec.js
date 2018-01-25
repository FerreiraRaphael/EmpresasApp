const Bluebird = require('bluebird');
const request = require('supertest');
const expect = require('expect.js');
const httpStatus = require('http-status');

const app = require('../app');
const models = require('../models');
const { CreateCompanyAndBranch } = require('../services/company');
const { CreateBranch } = require('../services/branch');

const { Company, Branch } = models;

describe('Route api/v1/search', () => {
  const validCNPJ = '81638735000147';
  const validCompanyData = {
    razaoSocial: 'Empresas App',
    cnpj: validCNPJ,
    status: true,
    branchStatus: true,
    city: 'Goiania',
    state: 'Goias'
  };
  const validBranchData = {
    cnpj: `${validCNPJ.slice(0, 8)}000247`,
    status: true,
    city: 'Anapolis',
    state: 'Goias'
  };
  let createdCompany;
  before(() => models.sequelize.sync());
  beforeEach(() =>
    Bluebird.all([
      Company.destroy({
        where: {}
      }),
      Branch.destroy({
        where: {}
      }),
      CreateCompanyAndBranch(validCompanyData).then(({ company }) => {
        createdCompany = company;
      })
    ])
  );
  describe('GET api/v1/search', () => {
    it('find the created company and branch, searching by all attributes', async () => {
      const response = await request(app)
        .get(
          `/api/v1/search?razaoSocial=Empresas App&state=Goias&city=Goiania&cpnj=81638735000147&status=true&branchStatus=true`
        )
        .set('Accept', /application\/json/)
        .send()
        .expect(httpStatus.OK);
      const { body } = response.body;
      expect(body.length).to.be(1);
    });

    it('find the created company and branch, searching by cnpj', async () => {
      const response = await request(app)
        .get(`/api/v1/search?cnpj=81638735000147`)
        .set('Accept', /application\/json/)
        .send()
        .expect(httpStatus.OK);
      const { body } = response.body;
      expect(body.length).to.be(1);
    });

    it('find the created company and branch, searching by razao social', async () => {
      const response = await request(app)
        .get(`/api/v1/search?razaoSocial=Empresas App&state=Goias`)
        .set('Accept', /application\/json/)
        .send()
        .expect(httpStatus.OK);
      const { body } = response.body;
      expect(body.length).to.be(1);
    });

    it('find the created company and branch, searching by state', async () => {
      const response = await request(app)
        .get(`/api/v1/search?state=Goias`)
        .set('Accept', /application\/json/)
        .send()
        .expect(httpStatus.OK);
      const { body } = response.body;
      expect(body.length).to.be(1);
    });

    it('find only the Anapolis branch, searching by city', async () => {
      await CreateBranch({ ...validBranchData, CompanyId: createdCompany.id });
      const response = await request(app)
        .get(`/api/v1/search?city=Anapolis`)
        .set('Accept', /application\/json/)
        .send()
        .expect(httpStatus.OK);
      const { body } = response.body;
      expect(body.length).to.be(1);
    });

    it('find only inactive company, searching by status', async () => {
      await CreateCompanyAndBranch({
        ...validCompanyData,
        cnpj: '81638734000147',
        status: false
      });
      const response = await request(app)
        .get(`/api/v1/search?status=false`)
        .set('Accept', /application\/json/)
        .send()
        .expect(httpStatus.OK);
      const { body } = response.body;
      expect(body.length).to.be(1);
    });

    it('find only inactive branch, searching by branchStatus', async () => {
      await CreateCompanyAndBranch({
        ...validCompanyData,
        cnpj: '81638734000147',
        status: true,
        branchStatus: false
      });
      const response = await request(app)
        .get(`/api/v1/search?branchStatus=false`)
        .set('Accept', /application\/json/)
        .send()
        .expect(httpStatus.OK);
      const { body } = response.body;
      expect(body.length).to.be(1);
    });
  });
});
