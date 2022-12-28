import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Group from "./groupModel.js";

const { DataTypes } = Sequelize;

export const ScheduleMon = db.define('schedule_mon', {
    room: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    p1_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p1_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p1_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p1_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p2_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p2_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p2_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p2_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p3_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p3_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p3_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p3_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p4_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p4_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p4_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p4_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p5_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p5_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p5_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p5_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p6_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p6_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p6_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p6_info: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true //to not interfere with the table name (table name same as model name)
});

export const ScheduleTue = db.define('schedule_tue', {
    room: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    p1_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p1_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p1_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p1_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p2_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p2_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p2_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p2_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p3_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p3_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p3_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p3_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p4_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p4_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p4_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p4_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p5_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p5_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p5_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p5_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p6_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p6_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p6_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p6_info: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true //to not interfere with the table name (table name same as model name)
});

export const ScheduleWed = db.define('schedule_wed', {
    room: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    p1_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p1_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p1_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p1_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p2_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p2_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p2_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p2_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p3_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p3_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p3_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p3_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p4_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p4_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p4_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p4_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p5_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p5_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p5_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p5_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p6_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p6_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p6_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p6_info: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true //to not interfere with the table name (table name same as model name)
});

export const ScheduleThu = db.define('schedule_thu', {
    room: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    p1_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p1_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p1_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p1_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p2_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p2_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p2_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p2_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p3_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p3_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p3_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p3_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p4_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p4_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p4_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p4_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p5_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p5_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p5_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p5_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p6_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p6_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p6_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p6_info: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true //to not interfere with the table name (table name same as model name)
});

export const ScheduleFri = db.define('schedule_fri', {
    room: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    p1_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p1_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p1_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p1_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p2_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p2_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p2_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p2_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p3_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p3_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p3_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p3_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p4_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p4_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p4_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p4_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p5_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p5_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p5_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p5_info: {
        type: DataTypes.STRING,
        allowNull: true
    },

    p6_slot: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p6_course: {
        type: DataTypes.STRING,
        allowNull: true
    },
    p6_group: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    p6_info: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true //to not interfere with the table name (table name same as model name)
});

(async () => {
    await db.sync();
})();

ScheduleMon.belongsTo(Group, { as: "p1_group_details", foreignKey: "p1_group"});
ScheduleMon.belongsTo(Group, { as: "p2_group_details", foreignKey: "p2_group" });
ScheduleMon.belongsTo(Group, { as: "p3_group_details", foreignKey: "p3_group" });
ScheduleMon.belongsTo(Group, { as: "p4_group_details", foreignKey: "p4_group" });
ScheduleMon.belongsTo(Group, { as: "p5_group_details", foreignKey: "p5_group" });
ScheduleMon.belongsTo(Group, { as: "p6_group_details", foreignKey: "p6_group" });

ScheduleTue.belongsTo(Group, { as: "p1_group_details", foreignKey: "p1_group"});
ScheduleTue.belongsTo(Group, { as: "p2_group_details", foreignKey: "p2_group" });
ScheduleTue.belongsTo(Group, { as: "p3_group_details", foreignKey: "p3_group" });
ScheduleTue.belongsTo(Group, { as: "p4_group_details", foreignKey: "p4_group" });
ScheduleTue.belongsTo(Group, { as: "p5_group_details", foreignKey: "p5_group" });
ScheduleTue.belongsTo(Group, { as: "p6_group_details", foreignKey: "p6_group" });

ScheduleWed.belongsTo(Group, { as: "p1_group_details", foreignKey: "p1_group"});
ScheduleWed.belongsTo(Group, { as: "p2_group_details", foreignKey: "p2_group" });
ScheduleWed.belongsTo(Group, { as: "p3_group_details", foreignKey: "p3_group" });
ScheduleWed.belongsTo(Group, { as: "p4_group_details", foreignKey: "p4_group" });
ScheduleWed.belongsTo(Group, { as: "p5_group_details", foreignKey: "p5_group" });
ScheduleWed.belongsTo(Group, { as: "p6_group_details", foreignKey: "p6_group" });

ScheduleThu.belongsTo(Group, { as: "p1_group_details", foreignKey: "p1_group"});
ScheduleThu.belongsTo(Group, { as: "p2_group_details", foreignKey: "p2_group" });
ScheduleThu.belongsTo(Group, { as: "p3_group_details", foreignKey: "p3_group" });
ScheduleThu.belongsTo(Group, { as: "p4_group_details", foreignKey: "p4_group" });
ScheduleThu.belongsTo(Group, { as: "p5_group_details", foreignKey: "p5_group" });
ScheduleThu.belongsTo(Group, { as: "p6_group_details", foreignKey: "p6_group" });

ScheduleFri.belongsTo(Group, { as: "p1_group_details", foreignKey: "p1_group"});
ScheduleFri.belongsTo(Group, { as: "p2_group_details", foreignKey: "p2_group" });
ScheduleFri.belongsTo(Group, { as: "p3_group_details", foreignKey: "p3_group" });
ScheduleFri.belongsTo(Group, { as: "p4_group_details", foreignKey: "p4_group" });
ScheduleFri.belongsTo(Group, { as: "p5_group_details", foreignKey: "p5_group" });
ScheduleFri.belongsTo(Group, { as: "p6_group_details", foreignKey: "p6_group" });
