const { Company } = require('../../models');

/**
 * Deletes a company.
 * @function DeleteCompany
 * @param {string} id Company Id.
 * @returns {Promise<object, Error>} Company and Branch objects.
 */
function DeleteCompany(id) {
  return new Promise(async (res, rej) => {
    try {
      const company = await Company.destroy({
        where: { id },
        returning: true,
        plain: true
      });

      res(company);
    } catch (e) {
      rej(e);
    }
  });
}

module.exports = { DeleteCompany };
