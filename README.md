<p align="center">
  <img src="https://user-images.githubusercontent.com/64033139/217038504-a9ba063c-9941-478c-8e70-ae0f9b2fbc6c.gif" width="550" alt="animated" />
</p>

# 🔎Google SEO Keywords Generator

This small tool has CLI and in-code interfaces. It is used to generate keyword ideas using [Google's Autocomplete](https://serpapi.com/google-autocomplete-api), [People also search](https://serpapi.com/related-searches) and [People also ask](https://serpapi.com/related-questions) results and save them to TXT, CSV, JSON file. Scrape results were obtained using [SerpApi](https://serpapi.com/).

Currently supports:

- Google search
- other engines soon.

📌Note: If you want to use this tool for personal or commercial purposes, you must register on [SerpApi](https://serpapi.com/) and get your own API key (no credit card needed, free plan available). The default API key used is for informational purposes only.

## Install

If you want to use SEO Keywords generator as CLI and save results in a file, you need to install it globally:

```bash
npm i -g js-seo-keywords-generator
```

If you want to get results from SEO Keywords generator in your Node.js app, you need to add it to your project dependency:

```bash
npm i js-seo-keywords-generator
```

## CLI Usage

Before use, you must add an environment variable `API_KEY` with [your API key from SerpApi](https://serpapi.com/manage-api-key). [Read more](https://en.wikipedia.org/wiki/Environment_variable) how to add it in different systems.

Usage example:

```bash
seo get <search  query>
```

Usage options:

```bash
seo help get
```

<details>
<summary>Available arguments</summary>

```lang-none
  -e, --engine <engine(s)...>      Parameter defines the engine(s) of use. It can be set to "paa" (People Also Ask),
                                   "rs" (Related Searches), "ac" (Autocomplete), or in any combination, e.g.
                                   "paa,rs,ac" (default). (default: ["paa","rs","ac"])
  -d, --domain <google domain>     Parameter defines the Google domain to use. It defaults to google.com. Head to the
                                   https://serpapi.com/google-domains for a full list of supported Google domains.
                                   (default: "google.com")
  -gl, --country <country code>    Parameter defines the country to use for the Google search. Head to the
                                   https://serpapi.com/google-countries for a full list of supported Google countries.
                                   (default: "us")
  -hl, --language <language code>  Parameter defines the language to use for the Google search. Head to the
                                   https://serpapi.com/google-languages for a full list of supported Google languages.
                                   (default: "en")
  -dl, --depth <depth limit>       Parameter defines the depth of disclosure of questions for People Also Ask (default:
                                   "1")
  -ft, --type <file type>          Parameter defines the type of file to save. (choices: "json", "txt", "csv", default:
                                   "json")
  -h, --help                       display help for command
```

</details>

📌Note: The depth limit parameter for People Also Ask can be set from 1 to 3. This limit is set because for each depth value, the number of results returned grows exponentially, for example, if the number of results is `5` at each level, for a depth of `3`, the total number of results will be equals `125`.

## In code usage

Import `SEO` to your file:

```javascript
import SEO from "seo-keywords";
```

Before use, you need to define [your API key from SerpApi](https://serpapi.com/manage-api-key). There are several ways to do this:

- Add an environment variable `API_KEY` with your key. [Read more](https://en.wikipedia.org/wiki/Environment_variable) how to add it in different systems;
- Add your key directly in code: `SEO.api_key = "your_api_key"`.

Usage example:

```javascript
(async () => {
  console.log(await SEO.getAll("minecraft"));
})();
```

Awailable methods:

```javascript
getAll(query[, domain[, country[, language[, depthlimit]]]])
getCustom(engines, query[, domain[, country[, language[, depthlimit]]]])
getPeopleAlsoAsk(query[, domain[, country[, language[, depthlimit]]]])
getRelatedSearch(query[, domain[, country[, language]]])
getAutocomplete(query[, domain[, country[, language]]])
```

- `query` - search query.
- `engines` - parameter defines the engine(s) of use:
  - `paa` (People Also Ask)
  - `rs` (Related Searches)
  - `ac` (Autocomplete)
  - could be combined: `paa, ac`
- `domain` - parameter defines the Google domain to use. Head to the [Google domains page](https://serpapi.com/google-domains) for a full list of supported Google domains. Default is `google.com`.
- `country` - parameter defines the country to use for the Google search. Head to the [Google countries page](https://serpapi.com/google-countries) for a full list of supported Google countries. Default is `us`.
- `language` - parameter defines the language to use for the Google search. Head to the [Google languages page](https://serpapi.com/google-languages) for a full list of supported Google languages. Default is `en`.
- `depthlimit` - parameter defines the depth of disclosure of questions for People Also Ask. Default is `1` (Only for People Also Ask engine).

📌Note: The depth limit parameter for People Also Ask can be set from 1 to 3. This limit is set because for each depth value, the number of results returned grows exponentially, for example, if the number of results is `5` at each level, for a depth of `3`, the total number of results will be equals `125`.

Read more usage examples in [JavaScript SEO Keywords Research Tool: Google Autocomplete, People Also Ask, and People Also Search For](https://serpapi.com/blog/google-seo-keywords-generator-tool-nodejs/) blog post.
