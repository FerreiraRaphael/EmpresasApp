/**
 * @module routes/users
 * @file /api/v1/company API routes
 */

const express = require('express');

const { withApiError, withApiResponse } = require('../lib/helpers');
const {
  CreateCompanyAndBranch,
  UpdateCompany,
  DeleteCompany
} = require('../services/company');

const { Company } = require('../models');

const router = express.Router();

router.route('/').post(
  /**
   * POST /api/v1/company
   * Creates a company and it's initial branch.
   * @function createCompany
   * @param {Request} req Express Request.
   * @param {Object} req.body Request body.
   * @param {string} req.body.cnpj Company CNPJ.
   * @param {string} req.body.razaoSocial Company Razao Social.
   * @param {string} req.body.status Company Status.
   * @param {string} req.body.city Branch city.
   * @param {string} req.body.state Branch state.
   * @param {string} req.body.branchStatus Branch branch.
   * @param {Response} res Express Response.
   */
  async (req, res) => {
    const { cnpj, status, city, state, branchStatus, razaoSocial } = req.body;
    try {
      const { company, branch } = await CreateCompanyAndBranch({
        cnpj,
        status,
        city,
        state,
        branchStatus,
        razaoSocial
      });
      withApiResponse({
        description: `Company and Branch created with CNPJ ${cnpj}`,
        body: { company, branch }
      })(res);
    } catch (error) {
      withApiError({
        description: `Error while creating company: ${error.message}`,
        error,
        code: 'routes.company.createCompany'
      })(res);
    }
  }
);
router
  .route('/:CompanyId')
  .get(
    /**
     * GET /api/v1/company/:CompanyId
     * Finds a company by its id.
     * @function findCompany
     * @param {Request} req Express Request.
     * @param {string} req.params.CompanyId Company Id.
     * @param {Response} res Express Response.
     */
    async (req, res) => {
      const id = req.params.CompanyId;
      try {
        const company = await Company.find({ where: { id } });
        withApiResponse({
          description: `Company with ID ${id}`,
          body: company
        })(res);
      } catch (error) {
        withApiError({
          description: `Error while search company: ${error.message}`,
          error,
          code: 'routes.company.findCompany'
        })(res);
      }
    }
  )
  .put(
    /**
     * PUT /api/v1/company/:CompanyId
     * Updates a company.
     * @function updateCompany
     * @param {Request} req Express Request.
     * @param {string} req.params.CompanyId Company Id.
     * @param {Object} req.body Request body.
     * @param {string} req.body.status Company Status.
     * @param {string} req.body.razaoSocial Company Razao Social.
     * @param {Response} res Express Response.
     */
    async (req, res) => {
      const id = req.params.CompanyId;
      try {
        const company = await UpdateCompany({
          id,
          ...req.body
        });
        withApiResponse({
          description: `Company with ID ${id} updated`,
          body: company
        })(res);
      } catch (error) {
        withApiError({
          description: `Error while updating company: ${error.message}`,
          error,
          code: 'routes.company.updateCompany'
        })(res);
      }
    }
  )
  .delete(
    /**
     * DELETE /api/v1/company/:CompanyId
     * Delete a company and it's Branchs.
     * @function deleteCompany
     * @param {Request} req Express Request.
     * @param {string} req.params.CompanyId Company Id.
     * @param {Response} res Express Response.
     */
    async (req, res) => {
      const id = req.params.CompanyId;
      try {
        const company = await DeleteCompany(id);
        withApiResponse({
          description: `Company with ID ${id} deleted`,
          body: company
        })(res);
      } catch (error) {
        withApiError({
          description: `Error while deleting company: ${error.message}`,
          error,
          code: 'routes.company.deleteCompany'
        })(res);
      }
    }
  );

module.exports = router;
