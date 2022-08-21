module.exports = (sequelize, DataTypes) => {
  const Resume = sequelize.define("Resume",
    {
      resumeId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      fkUserId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      fkJobOpeningId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      modelName: "Resume",
      tableName: "resumes",
      underscored: true,
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  );
  return Resume;
};
