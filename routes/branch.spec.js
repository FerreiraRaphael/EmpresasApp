const Bluebird = require('bluebird');
const request = require('supertest');
const expect = require('expect.js');
const httpStatus = require('http-status');

const app = require('../app');
const models = require('../models');
const { CreateCompanyAndBranch } = require('../services/company');
const { CreateBranch } = require('../services/branch');

const { Company, Branch } = models;

describe('Route api/v1/branch', () => {
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
    city: 'Goiania',
    state: 'Goias'
  };

  describe('POST api/v1/branch', () => {
    it('creates a branch', async () => {
      const { company } = await CreateCompanyAndBranch(validCompanyData);
      await request(app)
        .post(`/api/v1/branch`)
        .set('Accept', /application\/json/)
        .send({ ...validBranchData, CompanyId: company.id })
        .expect(httpStatus.OK);
      const companyCount = await Company.count();
      const branchCount = await Branch.count();
      expect(companyCount).to.be(1);
      expect(branchCount).to.be(2);
    });

    it('fails to create a branch with invalid base cnpj', async () => {
      const { company } = await CreateCompanyAndBranch(validCompanyData);
      await request(app)
        .post('/api/v1/branch')
        .set('Accept', /application\/json/)
        .send({ ...validBranchData, CompanyId: company.id, cnpj: '111111111' })
        .expect(httpStatus.BAD_REQUEST);
      const companyCount = await Company.count();
      const branchCount = await Branch.count();
      expect(companyCount).to.be(1);
      expect(branchCount).to.be(1);
    });

    it('fails to create a branch with same cnpj', async () => {
      const { company } = await CreateCompanyAndBranch(validCompanyData);
      await request(app)
        .post('/api/v1/branch')
        .set('Accept', /application\/json/)
        .send({ ...validBranchData, CompanyId: company.id, cnpj: validCNPJ })
        .expect(httpStatus.BAD_REQUEST);
      const companyCount = await Company.count();
      const branchCount = await Branch.count();
      expect(companyCount).to.be(1);
      expect(branchCount).to.be(1);
    });
  });

  describe('PUT /api/v1/branch/:BranchId', () => {
    it('updates the company', async () => {
      const { branch } = await CreateCompanyAndBranch(validCompanyData);
      await request(app)
        .put(`/api/v1/branch/${branch.id}`)
        .set('Accept', /application\/json/)
        .send({
          city: 'Anapolis'
        })
        .expect(httpStatus.OK);
      await branch.reload();
      expect(branch.city).to.be('Anapolis');
    });
  });

  describe('DELETE /api/v1/branch/:BranchId', () => {
    it('deletes a branch', async () => {
      const { company } = await CreateCompanyAndBranch(validCompanyData);
      const branch = await CreateBranch({
        ...validBranchData,
        CompanyId: company.id
      });
      await request(app)
        .delete(`/api/v1/branch/${branch.id}`)
        .set('Accept', /application\/json/)
        .send()
        .expect(httpStatus.OK);
      const companyCount = await Company.count();
      const branchCount = await Branch.count();
      expect(companyCount).to.be(1);
      expect(branchCount).to.be(1);
    });

    it('fails to delete company only branch', async () => {
      const { branch } = await CreateCompanyAndBranch(validCompanyData);
      await request(app)
        .delete(`/api/v1/branch/${branch.id}`)
        .set('Accept', /application\/json/)
        .send()
        .expect(httpStatus.BAD_REQUEST);
      const companyCount = await Company.count();
      const branchCount = await Branch.count();
      expect(companyCount).to.be(1);
      expect(branchCount).to.be(1);
    });
  });
});
