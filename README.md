## About

SEO Keywords generator - Generate keyword ideas with Google's Autocomplete, People also search and People also ask. Scrape results obtained using [SerpApi](https://serpapi.com/).

## Install

If you want to use SEO Keywords generator as CLI and save results in a file, you need to install it globally:

```bash
npm i -g seo-keywords
```

If you want to get results from SEO Keywords generator in your Node.js app, you need to add it to your project dependency:

```bash
npm i seo-keywords
```

## CLI Usage

Usage example:

```bash
seo get <search  query>
```

Usage options:

```bash
seo help get
```

## In code usage

Import `SEO` to your file:

```javascript
import SEO from "seo-keywords";
```

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

- `query` - search query;
- `engines` - parameter defines the engine(s) of use. It can be set to "paa" (People Also Ask), "rs" (Related Searches), "ac" (Autocomplete), or in any combination, e.g. "paa,ac";
- `domain` - parameter defines the Google domain to use. It defaults to google.com. Head to the [Google domains page](https://serpapi.com/google-domains) for a full list of supported Google domains. Default is "google.com";
- `country` - parameter defines the country to use for the Google search. Head to the [Google countries page](https://serpapi.com/google-countries) for a full list of supported Google countries. Default is "us";
- `language` - parameter defines the language to use for the Google search. Head to the [Google languages page](https://serpapi.com/google-languages) for a full list of supported Google languages. Default is "en";
- `depthlimit` - Parameter defines the depth of disclosure of questions for People Also Ask. Default is "1" (Only for People Also Ask engine);
