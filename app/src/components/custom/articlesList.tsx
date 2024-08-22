import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Article } from "../../types/articles";

interface ArticleListProps {
  articles: Article[];
}

const ArticleList = ({ articles }: ArticleListProps) => {
  
  return (
    <div className="flex flex-wrap justify-start gap-6 pl-20">
      {articles.map((article, index) => (
        <div key={index}>
          <Card  className="w-96 min-h-96">
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>{article.source}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{article.description}</p>
            </CardContent>
            <CardFooter >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-auto"
              >
                Read more
              </a>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
