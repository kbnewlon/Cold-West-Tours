module.exports = function (sequelize, DataTypes) {
    var Resort = sequelize.define("Resort", {
        // Giving the Author model a name of type STRING
        name: {
            DataTypes: STRING,
            allowNull: false
        },
        address: {
            DataTypes: STRING,
            allowNull: false
        },
        phone: {
            DataTypes: STRING,
            allowNull: false
        },
        url: {
            DataTypes: STRING,
            allowNull: false
        }
    });

    Resort.associate = function (models) {
        // Associating Resort with Activity and Resort_Activity
        // When an Resort is deleted, also delete any associated Resort_Activity
        Resort.hasMany(models.Resort_Activity, {
            onDelete: "cascade"
        });
        Resort.belongsToMany(models.Activity, { through: models.Resort_Activity });
    };

    return Resort;
};