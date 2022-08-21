module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User",
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      modelName: "User",
      tableName: "users",
      underscored: true,
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  );
  User.associate = (db) => {
    User.belongsToMany(db.JobOpening, {
      through: db.Resume,
      as: "jobOpenings",
      foreignKey: {
        name: "fkUserId",
        allowNull: false,
      },
    });
  };
  return User;
};
