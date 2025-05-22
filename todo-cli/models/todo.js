// models/todo.js
"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list\n");

      console.log("Overdue");
      const overdueItems = await Todo.overdue();
      overdueItems.forEach((item) => {
        console.log(item.displayableString());
      });
      console.log("\n");

      console.log("Due Today");
      const todayItems = await Todo.dueToday();
      todayItems.forEach((item) => {
        console.log(item.displayableString());
      });
      console.log("\n");

      console.log("Due Later");
      const laterItems = await Todo.dueLater();
      laterItems.forEach((item) => {
        console.log(item.displayableString());
      });
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date().toISOString().slice(0, 10),
          },
          // completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueToday() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date().toISOString().slice(0, 10),
          },
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date().toISOString().slice(0, 10),
          },
          // completed: false,
        },
        order: [["id", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      const todo = await Todo.findByPk(parseInt(id));
      if (todo) {
        todo.completed = true;
        await todo.save();
      }
    }

    displayableString() {
      const checkbox = this.completed ? "[x]" : "[ ]";
      const today = new Date().toISOString().slice(0, 10);
      const dateStr = this.dueDate === today ? "" : this.dueDate;
      return `${this.id}. ${checkbox} ${this.title} ${dateStr}`.trim();
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );

  return Todo;
};
