module.exports = function (sequelize, DataTypes) {
    var Resort = sequelize.define("Resort", {
        // Giving the Author model a name of type STRING
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
        // Associating Resort with Activity and Resort_Activity
        // When an Resort is deleted, also delete any associated Resort_Activity
        Resort.hasMany(models.Resort_Activity, {
            onDelete: "cascade"
        });
        Resort.belongsToMany(models.Activity, { through: models.Resort_Activity });
    };

    return Resort;
};