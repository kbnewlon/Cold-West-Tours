module.exports = function (sequelize, DataTypes) {
    var Activity = sequelize.define("Activity", {
        // Giving the Author model a name of type STRING
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slope: {
            type: DataTypes.BOOLEAN,
            defaultValue: false

        }
    }, {
        timestamps: false
    });

    Activity.associate = function (models) {
        // Associating Activity with Resort and Resort_Activity
        // When an Activity is deleted, also delete any associated Resort_Activity
        Activity.hasMany(models.Resort_Activity, {
            onDelete: "cascade"
        });
        Activity.belongsToMany(models.Resort, { through: models.Resort_Activity });
    };

    return Activity;
};