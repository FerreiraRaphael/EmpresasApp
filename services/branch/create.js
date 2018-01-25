const CNPJ = require('node-cnpj');

const { Branch, Company } = require('../../models');

/**
 * Creates a branch.
 * @function CreateBranch
 * @param {string} cnpj Company CNPJ.
 * @param {string} status Company Status.
 * @param {string} city Branch city.
 * @param {string} state Branch state.
 * @param {boolean} status Branch status.
 * @param {string} CompanyId Company Id.
 * @returns {Promise<object, Error>} Branch object.
 */
function CreateBranch({ cnpj, city, state, status, CompanyId }) {
  return new Promise(async (res, rej) => {
    try {
      const unformatedCpnj = CNPJ.unMask(cnpj);
      const company = await Company.find({ where: { id: CompanyId } });
      if (company.cnpjBase !== cnpj.slice(0, 8)) {
        rej(new Error('CNPJ raiz não é valido'));
      }
      const branch = await Branch.create({
        cnpj: unformatedCpnj,
        city,
        state,
        status,
        CompanyId
      });
      res(branch);
    } catch (e) {
      rej(e);
    }
  });
}

module.exports = { CreateBranch };
