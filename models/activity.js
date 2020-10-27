module.exports = function (sequelize, DataTypes) {
    var Activity = sequelize.define("Activity", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slope: {
            type: DataTypes.BOOLEAN,
            defaultValue: false

        },
        about: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        guide: {
            type: DataTypes.TEXT,
            allowNull: false
        }, 
        actImage: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Activity.associate = function (models) {
        // Associating Activity with Resort and User
        // When an Activity is deleted, update any associated User and set the fav activity to NULL
        Activity.hasMany(models.User, {
            foreignKey: {
                name: "fav_activity"
            },
            onDelete: "SET NULL"
        });
    };

    return Activity;
};