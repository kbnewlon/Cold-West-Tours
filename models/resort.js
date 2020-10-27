module.exports = function (sequelize, DataTypes) {
    var Resort = sequelize.define("Resort", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false
        },
        lon: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false
        }, 
        policy: {
            type: DataTypes.STRING(1234),
            allowNull: false
        }, 
        overview: {
            type: DataTypes.STRING(1234),
            allowNull: false
        },
        pic1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pic2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pic3: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pic4: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pic5: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    Resort.associate = function (models) {
        // Associating Resort with Activity and User
        // When an Resort is deleted, update any associated User and set the fav resort to NULL
        Resort.hasMany(models.User, {
            foreignKey: {
                name: "fav_resort"
            },
            onDelete: "Set Null"
        });
    };

    return Resort;
};