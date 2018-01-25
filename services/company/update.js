const { Company } = require('../../models');
const { notNullKeys } = require('../../lib/helpers');

/**
 * Updates a company.
 * @function UpdateCompany
 * @param {string} id Company Id.
 * @param {string} status Company Status.
 * @param {string} razaoSocial Company Razao Social.
 * @returns {Promise<object, Error>} Company and Branch objects.
 */
function UpdateCompany({ id, status, razaoSocial }) {
  return new Promise(async (res, rej) => {
    try {
      const company = await Company.findById(id);
      await company.update(
        notNullKeys({
          razaoSocial,
          status
        })
      );

      res(company);
    } catch (e) {
      rej(e);
    }
  });
}

module.exports = { UpdateCompany };
