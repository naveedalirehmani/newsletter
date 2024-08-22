import instance from "../api";
import { FetchArticlesProps, Article } from "../../hooks/fetchArticles";

export default class ArticleService {
  static KEYS = {
    newsApi: process.env.REACT_APP_NEWS_API,
    theGuardian: process.env.REACT_APP_THE_GUARDIAN,
    nyTimes: process.env.REACT_APP_NY_TIMES,
  };
  static async fetchArticles(values: FetchArticlesProps): Promise<Article[]> {
    const { keyword, category, date, source } = values;

    const sources =
      source === "all" ? ["newsApi", "theGuardian", "nyTimes"] : [source];

    const articlesPromises = sources.map((source) => {
      let url = "";

      switch (source) {
        case "newsApi":
          url = `https://newsapi.org/v2/everything?q=${keyword || ""}${
            category ? `&category=${category}` : ""
          }${date ? `&from=${date.toISOString()}` : ""}&apiKey=${
            ArticleService.KEYS[source]
          }`;
          break;
        case "theGuardian":
          url = `https://content.guardianapis.com/search?q=${keyword || ""}${
            category ? `&section=${category}` : ""
          }${date ? `&from-date=${date.toISOString()}` : ""}&api-key=${
            ArticleService.KEYS[source]
          }`;
          break;
        case "nyTimes":
            
          url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${
            keyword || ""
          }${category ? `&fq=news_desk:(${category})` : ""}${
            date ? `&begin_date=${formatDate(date)}` : ""
          }&api-key=${ArticleService.KEYS[source]}`;

          break;
      }

      return instance.get(url);
    });

    const results = await Promise.all(articlesPromises);

    return results.flatMap((result, index) => {
      const source = sources[index];

      switch (source) {
        case "newsApi":
          return result.data.articles.map((article: any) => ({
            title: article.title,
            description: article.description,
            url: article.url,
            source: "newsApi",
          }));
        case "theGuardian":
          return result.data.response.results.map((article: any) => ({
            title: article.webTitle,
            description: "",
            url: article.webUrl,
            source: "theGuardian",
          }));
        case "nyTimes":
          return result.data.response.docs.map((article: any) => ({
            title: article.headline.main,
            description: article.abstract || article.snippet,
            url: article.web_url,
            source: "nyTimes",
          }));
        default:
          return [];
      }
    });
  }
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0].replace(/-/g, "");
}
