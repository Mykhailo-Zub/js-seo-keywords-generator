import { getAutocompleteResults, getPeopleAlsoAskAndRelatedSearchesResults } from "../src/serpApi.js";

export const parseEngines = (value) => {
  return value.split(" ");
};

export const getResults = async (engines, query, domain, country, language, depthlimit) => {
  const results = {};
  let peopleAlsoAskAndRelatedSearchesResults;
  if (engines.some((el) => el === "paa" || el === "rs")) {
    peopleAlsoAskAndRelatedSearchesResults = await getPeopleAlsoAskAndRelatedSearchesResults(
      { q: query, google_domain: domain, gl: country, hl: language },
      depthlimit
    );
  }
  for (const engine of engines) {
    if (engine === "paa") {
      results.people_also_ask = peopleAlsoAskAndRelatedSearchesResults.peopleAlsoAsk;
    }
    if (engine === "rs") {
      results.related_searches = peopleAlsoAskAndRelatedSearchesResults.relatedSearches;
    }
    if (engine === "ac") {
      results.autocomplete = await getAutocompleteResults({ q: query, gl: country, hl: language });
    }
  }
  return results;
};
