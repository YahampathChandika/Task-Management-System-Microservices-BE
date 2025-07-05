module.exports = (sequelize, DataTypes) => {
    const Tasks = sequelize.define("Tasks", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.ENUM("TODO", "IN_PROGRESS", "DONE"),
            defaultValue: "TODO",
        },
        dueDate: {
            type: DataTypes.DATE,
        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    })
return Tasks;
}
