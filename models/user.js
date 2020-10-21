const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    var Resort = sequelize.define("Resort", {
        // Giving the Author model a name of type STRING
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fav_activity: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fav_resort: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false
    });

    Resort.associate = function (models) {
        // Associating Resort with Activity and Resort_Activity
        // When an Resort is deleted, also delete any associated Resort_Activity
        Resort.hasMany(models.Resort_Activity, {
            onDelete: "cascade"
        });
        Resort.belongsToMany(models.Activity, { through: models.Resort_Activity });
    };

    User.beforeCreate(function(user){
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);   
    });

    return Resort;
};