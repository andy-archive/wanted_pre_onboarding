module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define("Company",
    {
      companyId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      modelName: "Company",
      tableName: "companies",
      underscored: true,
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  );
  Company.associate = (db) => {
    Company.hasMany(db.JobOpening, {
      as: "JopOpenings",
      foreignKey: {
        name: "fkCompanyId",
        allowNull: false,
      },
      constraints: true,
      onDelete: "cascade",
    });
  };
  return Company;
};
