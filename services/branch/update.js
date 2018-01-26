const { Branch } = require('../../models');

/**
 * Updates a Branch.
 * @function UpdateBranch
 * @param {string} id Branch Id.
 * @param {string} status Branch Status.
 * @param {string} state Branch state.
 * @param {string} city Branch city.
 * @returns {Promise<object, Error>} Branch and Branch objects.
 */
function UpdateBranch(attributes) {
  return new Promise(async (res, rej) => {
    try {
      const branch = await Branch.findById(attributes.id);
      const result = await branch.update(attributes);

      res(result);
    } catch (e) {
      rej(e);
    }
  });
}

module.exports = { UpdateBranch };
