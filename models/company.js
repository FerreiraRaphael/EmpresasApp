/**
 * @file Company Sequelize Model definition.
 */

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    razaoSocial: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    cnpjBase: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [8,8],
        is: /^\d+$/
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Company.associate = ({ Branch }) => {
    Company.hasMany(Branch);
  };
  return Company;
};
