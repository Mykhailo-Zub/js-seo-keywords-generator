import dotenv from "dotenv";
import { config, getJson } from "serpapi";

dotenv.config();
// config.api_key = process.env.API_KEY;
config.api_key = "83bd9d6ce07a161441f4cdbc234456c79ebdf677a8d706d4b5dfcb0e962c2b05";

export const getPeopleAlsoAskAndRelatedSearchesResults = async (searchParams, depthLimit) => {
  const results = await getJson("google", searchParams);
  const relatedSearches = results?.related_searches?.map((el) => el.query);
  const peopleAlsoAsk = [];
  if (results?.related_questions) {
    peopleAlsoAsk.push(...results.related_questions?.map((el) => el.question));
    if (depthLimit > 1) {
      const getDepthResults = async (token, depth) => {
        const depthResults = await getJson("google_related_questions", { next_page_token: token });
        if (depthResults?.related_questions) {
          peopleAlsoAsk.push(...depthResults.related_questions?.map((el) => el.question));
          if (depth < depthLimit) {
            for (const question of depthResults.related_questions) {
              if (!question.next_page_token) {
                continue;
              }
              await getDepthResults(question.next_page_token, depth + 1);
            }
          }
        }
      };
      const questions = [...results.related_questions];
      for (const question of questions) {
        if (!question.next_page_token) {
          continue;
        }
        await getDepthResults(question.next_page_token, depthLimit);
      }
    }
  }

  return { peopleAlsoAsk, relatedSearches };
};

export const getAutocompleteResults = async (searchParams) => {
  const results = await getJson("google_autocomplete", searchParams);
  if (results?.suggestions) {
    const finalResults = results?.suggestions.map((el) => el.value);
    return finalResults;
  } else return `No results for ${searchParams.q}`;
};
