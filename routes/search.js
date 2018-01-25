/**
 * @module routes/users
 * @file /api/v1/company API routes
 */

const express = require('express');

const { withApiError, withApiResponse } = require('../lib/helpers');
const { SearchCompaniesAndBranches } = require('../services/search');

const router = express.Router();

router.route('/').get(
  /**
   * GET /api/v1/search
   * It searchs for branches and companies, by Razao Social, cnpj, city, state and status.
   * @function searchCompaniesAndBranches
   * @param {Request} req Express Request.
   * @param {string} req.query.cnpj Company CNPJ.
   * @param {string} req.query.razaoSocial Company Razao Social.
   * @param {string} req.query.status Company Status.
   * @param {string} req.query.city Branch city.
   * @param {string} req.query.state Branch state.
   * @param {string} req.query.branchStatus Branch status.
   * @param {Response} res Express Response.
   */
  async (req, res) => {
    const { cnpj, status, city, state, razaoSocial, branchStatus } = req.query;
    try {
      const searchResult = await SearchCompaniesAndBranches({
        branchStatus,
        cnpj,
        status,
        city,
        state,
        razaoSocial
      });
      withApiResponse({
        description: `Search Result`,
        body: searchResult
      })(res);
    } catch (error) {
      withApiError({
        description: `Error while searching: ${error.message}`,
        error,
        code: 'routes.search.searchCompaniesAndBranches'
      })(res);
    }
  }
);

module.exports = router;
