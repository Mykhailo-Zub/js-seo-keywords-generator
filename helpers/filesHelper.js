import fs from "fs/promises";
import path from "path";

export const saveFile = async (type, data, query) => {
  const fileName = path.join(
    process.cwd(),
    `${query}_${new Date().toLocaleDateString()}_${new Date().toLocaleTimeString().replaceAll(":", "-")}.${type}`
  );
  try {
    await fs.appendFile(fileName, data);
    console.log("Results saved to: ", fileName);
  } catch (e) {
    console.log(e);
  }
  return;
};
