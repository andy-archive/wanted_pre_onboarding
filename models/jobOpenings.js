module.exports = (sequelize, DataTypes) => {
  const JopOpening = sequelize.define(
    "JobOpening",
    {
      jobOpeningId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      fkCompanyId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: false,
      },
      techStack: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: false,
      },
      nationality: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      compensation: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      modelName: "JopOpening",
      tableName: "jobOpenings",
      underscored: true,
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  );
  JopOpening.associate = db => {
    JopOpening.belongsTo(db.Company, {
      through: db.Resume,
      as: "company",
      foreignKey: {
        name: "fkCompanyId",
        allowNull: false,
      },
    });
    JopOpening.belongsToMany(db.User, {
      through: db.Resume,
      as: "users",
      foreignKey: {
        name: "fkJobOpeningId",
        allowNull: false,
      },
    });
  };
  return JopOpening;
};
