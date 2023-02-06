import { Command, Option } from "commander";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const program = new Command();
import { getResults, parseEngines } from "../helpers/enginesHelper.js";
import { saveFile } from "../helpers/filesHelper.js";
import { logError, logSearchParams, logTitle, logWarning, removeLoader, setLoader } from "../helpers/logHelper.js";
const packageJson = require("../package.json");

const { description, version } = packageJson;

program.name("seo").description(description).version(version);

program
  .command("get")
  .description("Get results from supported engines and save to supported file (txt, csv, json)")
  .argument("<query>", "search query")
  .option(
    "-e, --engine <engine(s)...>",
    'Parameter defines the engine(s) of use. It can be set to "paa" (People Also Ask), "rs" (Related Searches), "ac" (Autocomplete), or in any combination, e.g. "paa,rs,ac" (default).',
    parseEngines,
    ["paa", "rs", "ac"]
  )
  .option(
    "-d, --domain <google domain>",
    "Parameter defines the Google domain to use. It defaults to google.com. Head to the https://serpapi.com/google-domains for a full list of supported Google domains.",
    "google.com"
  )
  .option(
    "-gl, --country <country code>",
    "Parameter defines the country to use for the Google search. Head to the https://serpapi.com/google-countries for a full list of supported Google countries.",
    "us"
  )
  .option(
    "-hl, --language <language code>",
    "Parameter defines the language to use for the Google search. Head to the https://serpapi.com/google-languages for a full list of supported Google languages.",
    "en"
  )
  .option("-dl, --depth <depth limit>", "Parameter defines the depth of disclosure of questions for People Also Ask", "1")
  .addOption(new Option("-ft, --type <file type>", "Parameter defines the type of file to save.").choices(["json", "txt", "csv"]).default("json"))
  .action(async (query, options) => {
    const engines = options.engine;
    const domain = options.domain;
    const country = options.country;
    const language = options.language;
    const depthlimit = options.depth;
    const fileType = options.type;
    const unknownEngine = engines.find((el) => el !== "paa" && el !== "rs" && el !== "ac");
    if (unknownEngine) {
      console.error(
        `${logError(`Error: engine "${unknownEngine}" is not found. Awailable choises is "paa", "rs" and "ac".`)}\n${logWarning(
          "Operation aborted!"
        )}`
      );
      return;
    }
    logTitle();

    const isPaaPresent = engines.some((el) => el === "paa");
    logSearchParams(engines, domain, country, language, fileType, isPaaPresent ? depthlimit : null);

    const loader = setLoader();
    const results = await getResults(engines, query, domain, country, language, depthlimit);
    await removeLoader(loader);

    saveFile(fileType, JSON.stringify(results), query);
  });

export default program;
