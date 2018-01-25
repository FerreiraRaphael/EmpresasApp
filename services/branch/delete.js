const { Branch } = require('../../models');

/**
 * Deletes a Branch.
 * @function DeleteBranch
 * @param {string} id Branch Id.
 * @returns {Promise<object, Error>} Branch object.
 */
function DeleteBranch(id) {
  return new Promise(async (res, rej) => {
    try {
      const branch = await Branch.find({ where: { id } });
      const branchs = await Branch.findAll({
        where: { CompanyId: branch.CompanyId }
      });
      if (branchs.length === 1) {
        rej(new Error('Cant delete companys only branch'));
      } else {
        const result = await Branch.destroy({
          where: { id },
          returning: true,
          plain: true
        });

        res(result);
      }
    } catch (e) {
      rej(e);
    }
  });
}

module.exports = { DeleteBranch };
