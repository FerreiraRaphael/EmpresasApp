const { Branch } = require('../../models');
const { notNullKeys } = require('../../lib/helpers');

/**
 * Updates a Branch.
 * @function UpdateBranch
 * @param {string} id Branch Id.
 * @param {string} status Branch Status.
 * @param {string} state Branch state.
 * @param {string} city Branch city.
 * @returns {Promise<object, Error>} Branch and Branch objects.
 */
function UpdateBranch({ id, status, state, city }) {
  return new Promise(async (res, rej) => {
    try {
      const branch = await Branch.update(
        notNullKeys({
          state,
          status,
          city
        }),
        {
          where: { id },
          returning: true,
          plain: true
        }
      );

      res(branch);
    } catch (e) {
      rej(e);
    }
  });
}

module.exports = { UpdateBranch };
