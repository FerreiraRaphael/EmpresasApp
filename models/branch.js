/**
 * @file Branch Sequelize Model definition.
 */

module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define('Branch', {
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [14, 14],
        is: /^\d+$/
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      min: 2,
      max: 2
    }
  });

  Branch.associate = ({ Company }) => {
    Branch.belongsTo(Company, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Branch;
};
