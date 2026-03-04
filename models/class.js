module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    className: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};
     
module.exports = Class;