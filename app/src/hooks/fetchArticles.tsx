import axios from "axios";

export type FetchArticlesProps = {
  keyword: string;
  category?: string;
  date?: Date;
  source: "all" | "newsApi" | "theGuardian" | "nyTimes";
};

export interface Article {
  title: string;
  description: string;
  url: string;
  source: string;
}

const KEYS = {
  newsApi: process.env.REACT_APP_NEWS_API,
  theGuardian: process.env.REACT_APP_THE_GUARDIAN,
  nyTimes: process.env.REACT_APP_NY_TIMES,
};

export const fetchArticles = async ({
  keyword,
  category,
  date,
  source,
}: FetchArticlesProps): Promise<Article[]> => {
  const sources = source === "all" ? ["newsApi", "theGuardian", "nyTimes"] : [source];

  try {
    const articlesPromises = sources.map((source) => {
      let url = "";

      switch (source) {
        case "newsApi":
          url = `https://newsapi.org/v2/everything?q=${keyword || ""}${
            category ? `&category=${category}` : ""
          }${date ? `&from=${date.toISOString()}` : ""}&apiKey=${KEYS[source]}`;
          break;
        case "theGuardian":
          url = `https://content.guardianapis.com/search?q=${keyword || ""}${
            category ? `&section=${category}` : ""
          }${date ? `&from-date=${date.toISOString()}` : ""}&api-key=${
            KEYS[source]
          }`;
          break;
        case "nyTimes":
          url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${
            keyword || ""
          }${category ? `&fq=news_desk:(${category})` : ""}${
            date ? `&begin_date=${formatDate(date)}` : ""
          }&api-key=${KEYS[source]}`;
          break;
      }

      return axios.get(url);
    });

    const results = await Promise.all(articlesPromises);

    const articles = results.flatMap((result, index) => {
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

    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0].replace(/-/g, "");
}
