import { getResults } from "./helpers/enginesHelper.js";

const SEO = {
  getAll: async (query, domain = "google.com", country = "us", language = "en", depthlimit = "1") => {
    if (depthlimit > 3 || depthlimit < 1) {
      console.error(
        `${logError(`Error: Depth limit "${depthlimit}" is incorrect. Available depth from 1 to 3.`)}\n${logWarning("Operation aborted!")}`
      );
      return;
    }
    return getResults(["paa", "rs", "ac"], query, domain, country, language, depthlimit);
  },
  getCustom: async (engines, query, domain = "google.com", country = "us", language = "en", depthlimit = "1") => {
    const unknownEngine = engines.find((el) => el !== "paa" && el !== "rs" && el !== "ac");
    if (unknownEngine) {
      return `Error: engine "${unknownEngine}" is not found. Available choises is "paa", "rs" and "ac".\nOperation aborted!`;
    }
    if (depthlimit > 3 || depthlimit < 1) {
      console.error(
        `${logError(`Error: Depth limit "${depthlimit}" is incorrect. Available depth from 1 to 3.`)}\n${logWarning("Operation aborted!")}`
      );
      return;
    }
    return getResults(engines, query, domain, country, language, depthlimit);
  },
  getPeopleAlsoAsk: async (query, domain = "google.com", country = "us", language = "en", depthlimit = "1") => {
    if (depthlimit > 3 || depthlimit < 1) {
      console.error(
        `${logError(`Error: Depth limit "${depthlimit}" is incorrect. Available depth from 1 to 3.`)}\n${logWarning("Operation aborted!")}`
      );
      return;
    }
    return getResults(["paa"], query, domain, country, language, depthlimit);
  },
  getRelatedSearch: async (query, domain = "google.com", country = "us", language = "en") => {
    return getResults(["rs"], query, domain, country, language);
  },
  getAutocomplete: async (query, domain = "google.com", country = "us", language = "en") => {
    return getResults(["ac"], query, domain, country, language);
  },
  api_key: undefined,
};

export default SEO;
