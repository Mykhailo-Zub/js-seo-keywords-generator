import chalk from "chalk";
import figlet from "figlet";

export const logTitle = () => console.log(figlet.textSync("SerpApi  SEO Tool"));
export const logError = chalk.bold.red;
export const logWarning = chalk.hex("#FFA500");

export const logSearchParams = (engines, domain, country, language, fileType, depthlimit) => {
  const isOneEngine = engines.length === 1;
  const fullEnginesName = engines.map((el) => {
    if (el === "paa") return "People Also Ask";
    if (el === "rs") return "Related Searches";
    if (el === "ac") return "Autocomplete";
  });
  console.log(
    `${chalk.bold.underline("Search params:")}\n — Engine${isOneEngine ? "" : "s"}: ${fullEnginesName.join(
      ", "
    )}\n — Domain: ${domain}\n — Country: ${country}\n — Language: ${language}\n — File type: ${fileType}${
      depthlimit ? `\n — People Also Ask depth limit: ${depthlimit}` : ""
    }`
  );
};

export const setLoader = () => {
  const P = ["\\", "|", "/", "—"];
  let x = 0;
  return setInterval(() => {
    process.stdout.write(`\rGetting results ${chalk.green(P[x++])}`);
    x %= P.length;
  }, 250);
};

export const removeLoader = async (loader) => {
  clearInterval(loader);
  process.stdout.write(`\r${chalk.green("Results received")}\n`);
  await new Promise((resolve) => setTimeout(() => resolve(), 2000));
};
