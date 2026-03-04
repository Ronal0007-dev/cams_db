module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    fName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ParName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    className: {
      type: DataTypes.ENUM,
      values: ['EYC', 'Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5', 'Stage 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13'],
      allowNull: false
    },
    ClStream: {
      type: DataTypes.ENUM,
      values: ['H', 'T'],
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'student',
  });
  return student;
};

module.exports = student;