const { Op } = require('sequelize');
const { Company, Branch } = require('../../models');

/**
 * Return true if object has a key with value.
 * @function hasValues
 * @param {object} options A options object.
 * @returns {boolean}
 */
function hasValues(options) {
  return Object.keys(options).reduce(
    (option, result) => result || options[option],
    false
  );
}

/**
 * Creates the query options object for Company search.
 * @function CompanyQueryOptions
 * @param {string} razaoSocial Razao Social.
 * @param {string} cnpj CNPJ.
 * @param {string} status Company status.
 * @returns {object} Query object.
 */
function CompanyQueryOptions({ razaoSocial, cnpj, status }) {
  return hasValues({ razaoSocial, cnpj, status })
    ? {
        ...(razaoSocial
          ? { razaoSocial: { [Op.iLike]: `%${razaoSocial}%` } }
          : {}),
        ...(cnpj
          ? { cnpjBase: { [Op.iLike]: `%${cnpj.slice(0, 8)}%` } }
          : {}),
        ...(status ? { status: { [Op.eq]: !(status === 'false') } } : {})
      }
    : {};
}

/**
 * Creates the query options object for Branch search.
 * @function CompanyQueryOptions
 * @param {string} razaoSocial Razao Social.
 * @param {string} cnpj CNPJ.
 * @param {string} status Branch status.
 * @returns {object} Query object.
 */
function BranchQueryOptions({ cnpj, city, state, status }) {
  return hasValues({ cnpj, city, state, status })
    ? {
        ...(cnpj ? { cnpj: { [Op.iLike]: `%${cnpj}%` } } : {}),
        ...(city ? { city: { [Op.iLike]: `%${city}%` } } : {}),
        ...(state ? { state: { [Op.iLike]: `%${state}%` } } : {}),
        ...(status ? { status: { [Op.eq]: !(status === 'false') } } : {})
      }
    : {};
}

/**
 * It searchs for companies and it's branches, by Razao Social, cnpj, city, state and status.
 * @function SearchCompaniesAndBranches
 * @param {string} razaoSocial Razao Social.
 * @param {string} cnpj CNPJ.
 * @param {string} city Branch City.
 * @param {string} state Branch State.
 * @param {string} status Company status.
 * @param {string} branchStatus Branch status.
 * @returns {Promise<[object], Error>} Search Results objects.
 */
function SearchCompaniesAndBranches({
  razaoSocial,
  cnpj,
  city,
  state,
  status,
  branchStatus
}) {
  return new Promise(async (res, rej) => {
    try {
      const companies = await Company.findAll({
        where: CompanyQueryOptions({ razaoSocial, cnpj, status }),
        include: [
          {
            model: Branch,
            where: BranchQueryOptions({
              cnpj,
              city,
              state,
              status: branchStatus
            })
          }
        ]
      });
      const searchResult = companies.reduce(
        (result, company) => [
          ...company.Branches.map(branch => ({
            ...branch.dataValues,
            razaoSocial: company.razaoSocial,
            branchStatus: branch.status,
            status: company.status
          })),
          ...result
        ],
        []
      );
      res(searchResult);
    } catch (e) {
      rej(e);
    }
  });
}

module.exports = { SearchCompaniesAndBranches };
