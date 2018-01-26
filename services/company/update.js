const { Company } = require('../../models');

/**
 * Updates a company.
 * @function UpdateCompany
 * @param {Object} attributes Company attributes.
 * @param {string} attributes.id Company Id.
 * @param {string} attributes.status Company Status.
 * @param {string} attributes.razaoSocial Company Razao Social.
 * @returns {Promise<object, Error>} Company and Branch objects.
 */
function UpdateCompany(attributes) {
  return new Promise(async (res, rej) => {
    try {
      const company = await Company.findById(attributes.id);
      const result = await company.update(attributes);
      res(result);
    } catch (e) {
      rej(e);
    }
  });
}

module.exports = { UpdateCompany };
