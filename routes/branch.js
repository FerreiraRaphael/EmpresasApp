/**
 * @module routes/users
 * @file /api/v1/company/:CompanyId/branch API routes
 */

const express = require('express');

const { withApiError, withApiResponse } = require('../lib/helpers');
const {
  CreateBranch,
  UpdateBranch,
  DeleteBranch
} = require('../services/branch');

const { Branch } = require('../models');

const router = express.Router();

router.route('/').post(
  /**
   * POST /api/v1/branch
   * Creates a branch.
   * @function createBranch
   * @param {Request} req Express Request.
   * @param {Object} req.body Request body.
   * @param {string} req.body.cnpj Branch CNPJ.
   * @param {string} req.body.status Branch Status.
   * @param {string} req.body.city Branch city.
   * @param {string} req.body.state Branch state.
   * @param {string} req.body.CompanyId Company Id.
   * @param {Response} res Express Response.
   */
  async (req, res) => {
    const { cnpj, status, city, state, CompanyId } = req.body;
    try {
      const branch = await CreateBranch({
        cnpj,
        status,
        city,
        state,
        CompanyId
      });
      withApiResponse({
        description: `Branch created with CNPJ ${cnpj}`,
        body: branch
      })(res);
    } catch (error) {
      withApiError({
        description: `Error while creating branch: ${error.message}`,
        error,
        code: 'routes.branch.createBranch'
      })(res);
    }
  }
);
router
  .route('/:BranchId')
  .get(
    /**
     * GET /api/v1/branch/:BranchId
     * Find a branch by its id.
     * @function updateBranch
     * @param {Request} req Express Request.
     * @param {string} req.params.BranchId Branch Id.
     * @param {Response} res Express Response.
     */
    async (req, res) => {
      const id = req.params.BranchId;
      try {
        const branch = await Branch.find({ where: { id } });
        withApiResponse({
          description: `Branch with ID ${id}`,
          body: branch
        })(res);
      } catch (error) {
        withApiError({
          description: `Error while searching branch: ${error.message}`,
          error,
          code: 'routes.branch.findBranch'
        })(res);
      }
    }
  )
  .put(
    /**
     * PUT /api/v1/branch/:BranchId
     * Updates a branch.
     * @function updateBranch
     * @param {Request} req Express Request.
     * @param {string} req.params.BranchId Branch Id.
     * @param {Object} req.body Request body.
     * @param {string} req.body.status Branch Status.
     * @param {string} req.body.city Branch City.
     * @param {string} req.body.state Branch State.
     * @param {Response} res Express Response.
     */
    async (req, res) => {
      const id = req.params.BranchId;
      try {
        const branch = await UpdateBranch({
          id,
          ...req.body
        });
        withApiResponse({
          description: `Branch with ID ${id} updated`,
          body: branch
        })(res);
      } catch (error) {
        withApiError({
          description: `Error while updating branch: ${error.message}`,
          error,
          code: 'routes.branch.updateBranch'
        })(res);
      }
    }
  )
  .delete(
    /**
     * DELETE /api/v1/branch/:BranchId
     * Delete a Branch.
     * @function deleteBranch
     * @param {Request} req Express Request.
     * @param {string} req.params.BranchId Branch Id.
     * @param {Response} res Express Response.
     */
    async (req, res) => {
      const id = req.params.BranchId;
      try {
        const branch = await DeleteBranch(id);
        withApiResponse({
          description: `Branch with ID ${id} deleted`,
          body: branch
        })(res);
      } catch (error) {
        withApiError({
          description: `Error while deleting Branch: ${error.message}`,
          error,
          code: 'routes.branch.deleteBranch'
        })(res);
      }
    }
  );

module.exports = router;
