/**
 * @module routes/users
 * @file /api/v1/company API routes
 */

const express = require('express');
const fs = require('fs');
const multer = require('multer');
const Promise = require('bluebird');

const { withApiError, withApiResponse } = require('../lib/helpers');
const { ImportData } = require('../services/import');
const { Company, Branch } = require('../models');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.route('/').post(
  /**
   * POST /api/v1/import/
   * Imports data to the database by file sended.
   * @function importData
   * @param {Request} req Express Request.
   * @param {object} req.file Data file, ex: data.xml.
   * @param {Response} res Express Response.
   */
  upload.single('data'),
  async (req, res) => {
    try {
      fs.readFile(
        req.file.path,
        { encoding: 'utf-8' },
        async (errRead, data) => {
          if (errRead) {
            withApiError({
              description: `Error while searching: ${errRead.message}`,
              error: errRead,
              code: 'routes.import.importData'
            })(res);
          }
          const companies = await ImportData(data, 'xml');
          const promises = companies.reduce(
            (result, company) =>
              company.Branches.length === 0
                ? result
                : [
                    ...result,
                    new Promise(async (resolve, reject) => {
                      try {
                        const createdCompany = await Company.create({
                          razaoSocial: company.razaoSocial,
                          status: company.status,
                          cnpjBase: company.cnpjBase
                        });
                        await Branch.bulkCreate(
                          company.Branches.map(branch => ({
                            CompanyId: createdCompany.id,
                            city: branch.city,
                            cnpj: branch.cnpj,
                            state: branch.state,
                            status: branch.status,
                            createdAt: branch.createdAt,
                            updatedAt: branch.updatedAt
                          }))
                        );
                        const resolvedResult = await Company.findAll({
                          where: { id: createdCompany.id },
                          include: {
                            model: Branch
                          }
                        });
                        resolve(resolvedResult);
                      } catch (e) {
                        reject(e);
                      }
                    })
                  ],
            []
          );
          // const promises =
          Promise.all(promises)
            .then(results => {
              withApiResponse({
                description: 'Import data success',
                body: results
              })(res);
            })
            .catch(errors =>
              withApiError({
                description: `Error while searching`,
                errors,
                code: 'routes.import.importData'
              })(res)
            );
        }
      );
    } catch (error) {
      withApiError({
        description: `Error while searching: ${error.message}`,
        error,
        code: 'routes.import.importData'
      })(res);
    }
  }
);

module.exports = router;
