import fs from "fs/promises";
import path from "path";

const getDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let ap = "AM";
  if (hour > 11) {
    ap = "PM";
  }
  if (hour > 12) {
    hour = hour - 12;
  }
  if (hour === 0) {
    hour = 12;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (second < 10) {
    second = `0${second}`;
  }
  return `${month}-${day}-${year}_${hour}-${minute}-${second}_${ap}`;
};

export const saveFile = async (type, data, query) => {
  const fileName = path.join(process.cwd(), `${query}_${getDateTime()}.${type}`);
  try {
    await fs.appendFile(fileName, data);
    console.log("Results saved to: ", fileName);
  } catch (e) {
    console.log(e);
  }
  return;
};
