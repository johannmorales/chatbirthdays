import {
  formatDuration,
  intervalToDuration,
  isAfter,
  isSameDay,
  startOfDay,
} from "date-fns";
import { es } from "date-fns/locale";
import jsonData from "./data.json" assert { type: "json" };
import "dotenv/config";

export const handler = async (event) => {
  const isDev = process.env.NODE_ENV === "development";
  const today = new Date();
  const currentYear = today.getFullYear();

  const birthdaysRaw = jsonData;
  const birthdays = [];
  for (const year of [currentYear, currentYear + 1]) {
    for (const raw of birthdaysRaw) {
      birthdays.push({
        ...raw,
        birthday: new Date(year, raw.birthday.month - 1, raw.birthday.day),
      });
    }
  }

  const nextBirthday = birthdays
    .sort((a, b) => a.birthday - b.birthday)
    .find(
      (birthday) =>
        isSameDay(birthday.birthday, startOfDay(today)) ||
        isAfter(birthday.birthday, startOfDay(today))
    );

  const response = {
    statusCode: 200,
  };

  if (isSameDay(nextBirthday.birthday, today)) {
    response.body = `/announce HOY ES EL CUMPLEAÑOS DE ${nextBirthday.name} peepoBirthdayConfetti TODOS DESEENLE UN BUEN CUMPLEAÑOS Buhhloon owoL birthdayCheer`;
  } else {
    const duration = intervalToDuration({
      start: today,
      end: nextBirthday.birthday,
    });
    response.body = `Para el cumpleaños de ${
      nextBirthday.name
    } faltan: ${formatDuration(duration, {
      locale: es,
    })} peepoSitBirthday Abrazo Homi birthdayCheer`;
  }

  return response;
};
