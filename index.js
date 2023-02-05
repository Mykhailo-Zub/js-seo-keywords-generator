import { getResults } from "./helpers/enginesHelper.js";

const SEO = {
  getAll: async (query, domain = "google.com", country = "us", language = "en", depthlimit = "1") => {
    return getResults(["paa", "rs", "ac"], query, domain, country, language, depthlimit);
  },
  getCustom: async (engines, query, domain = "google.com", country = "us", language = "en", depthlimit = "1") => {
    const unknownEngine = engines.find((el) => el !== "paa" && el !== "rs" && el !== "ac");
    if (unknownEngine) {
      return `Error: engine "${unknownEngine}" is not found. Awailable choises is "paa", "rs" and "ac".\nOperation aborted!`;
    }
    return getResults(engines, query, domain, country, language, depthlimit);
  },
  getPeopleAlsoAsk: async (query, domain = "google.com", country = "us", language = "en", depthlimit = "1") => {
    return getResults(["paa"], query, domain, country, language, depthlimit);
  },
  getRelatedSearch: async (query, domain = "google.com", country = "us", language = "en") => {
    return getResults(["rs"], query, domain, country, language);
  },
  getAutocomplete: async (query, domain = "google.com", country = "us", language = "en") => {
    return getResults(["ac"], query, domain, country, language);
  },
};

export default SEO;
