const CNPJ = require('node-cnpj');

const { Company, Branch } = require('../../models');

/**
 * Creates a company and it's initial branch.
 * @function CreateCompanyAndBranch
 * @param {string} cnpj Company CNPJ.
 * @param {string} status Company Status.
 * @param {string} city Branch city.
 * @param {string} state Branch state.
 * @param {boolean} branchStatus Branch branch.
 * @param {string} razaoSocial Company Razao Social.
 * @returns {Promise<{company: object, branch: object}, Error>} Company and Branch objects.
 */
function CreateCompanyAndBranch({
  cnpj,
  status,
  city,
  state,
  branchStatus,
  razaoSocial
}) {
  return new Promise(async (res, rej) => {
    try {
      const unformatedCpnj = CNPJ.unMask(cnpj);
      if (unformatedCpnj.length !== 14 || !/^\d+$/.test(unformatedCpnj)) {
        return rej(new Error('CNPJ invalid'));
      }
      const exist = await Branch.find({
        where: {
          cnpj: unformatedCpnj
        }
      });
      if (exist) {
        return rej(new Error('CNPJ already exists'));
      }
      const company = await Company.create({
        razaoSocial,
        cnpjBase: unformatedCpnj.slice(0, 8),
        status
      });
      const branch = await Branch.create({
        cnpj: unformatedCpnj,
        city,
        state,
        status: branchStatus,
        CompanyId: company.id
      });
      return res({ company, branch });
    } catch (e) {
      return rej(e);
    }
  });
}

module.exports = { CreateCompanyAndBranch };
