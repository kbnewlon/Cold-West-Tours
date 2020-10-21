module.exports = function (sequelize, DataTypes) {
    var Resort_Activity = sequelize.define("Resort_Activity", {
        // Giving the Author model a name of type STRING
        cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    });

    Resort_Activity.associate = function (models) {
        // Associating Resort_Activity with Resort and Resort_Activity
        Resort_Activity.belongsTo(models.Activity);
        Resort_Activity.belongsTo(models.Resort);
    };

    return Resort_Activity;
};