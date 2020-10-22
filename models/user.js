const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // Giving the Author model a name of type STRING
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:
            {
                is: /[a-zA-Z0-9]+$/g,
                len: [4,24]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:
            {
                is: /[a-zA-Z0-9]+$/g,
                len: [6,24]
            }
        },
        fav_activity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fav_resort: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        timestamps: false
    });

    // User.associate = function (models) {
    //     // Associating Resort with Activity and Resort_Activity
    //     // When an Resort is deleted, also delete any associated Resort_Activity
    //     Resort.hasMany(models.Resort_Activity, {
    //         onDelete: "cascade"
    //     });
    //     Resort.belongsToMany(models.Activity, { through: models.Resort_Activity });
    // };

    User.beforeCreate(function(user){
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);   
    });

    return User;
};