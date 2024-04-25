const { isBefore, startOfDay, isSameDay } = require("date-fns");
const jsonData = require("./data.json");
require("dotenv").config();

export const handler = async (event) => {
  // TODO implement

  /**
   * @typedef Birthday
   * @property {string} username
   * @property {Date} date
   */
  const isDev = process.env.NODE_ENV === "development";
  const today = new Date();

  const birthdays = [];

  const nextBirthday = birthdays
    .sort((a, b) => a.date - b.date)
    .find((birthday) => !isBefore(birthday.date, startOfDay(today)));

  const response = {
    statusCode: 200,
  };

  if (isSameDay(nextBirthday.date, new Date())) {
    response.body = {};
  } else {
  }

  return response;
};
