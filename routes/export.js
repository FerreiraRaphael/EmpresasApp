/**
 * @module routes/users
 * @file /api/v1/company API routes
 */

const express = require('express');
const fs = require('fs');

const { withApiError } = require('../lib/helpers');
const { ExportData } = require('../services/export');

const router = express.Router();

router.route('/:type').get(
  /**
   * GET /api/v1/export/:type
   * Exports data from the data base, by type asked.
   * @function searchCompaniesAndBranches
   * @param {Request} req Express Request.
   * @param {string} req.params.type Type of file to export data.
   * @param {Response} res Express Response.
   */
  async (req, res) => {
    try {
      const { result, type } = await ExportData(req.params.type);
      const fileName = `${__dirname}/../tmp/${new Date().getTime()}-backup.${type}`;
      fs.writeFile(fileName, result, writeErr => {
        if (writeErr) {
          throw new Error(writeErr);
        }
        res.download(fileName, downloadErr => {
          if (downloadErr) {
            throw new Error(downloadErr);
          }
          fs.unlink(fileName, unlinkErr => {
            if (unlinkErr) {
              throw new Error(unlinkErr);
            }
          });
        });
      });
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
