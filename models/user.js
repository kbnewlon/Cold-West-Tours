const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // only allow letters and numbers with a length between 4 and 24 characters
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
        // only allow letters and numbers with a length between 6 and 24 characters
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:
            {
                is: /[a-zA-Z0-9]+$/g,
                len: [6,24]
            }
        }
        
    }, {
        timestamps: false
    });

    User.associate = function (models) {
        // Associating User with Resort and Activity
        User.belongsTo(models.Activity, {
            foreignKey: {
            name : "fav_activity",
            type: DataTypes.INTEGER,
            allowNull: true
            }
        });
        User.belongsTo(models.Resort, {
            foreignKey: {
            name : "fav_resort",
            type: DataTypes.INTEGER,
            allowNull: true
            }
        });
    };

    // encrypt the user password before adding it to the database
    User.beforeCreate(function(user){
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);   
    });

    return User;
};