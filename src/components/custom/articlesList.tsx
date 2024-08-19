import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Article {
  title: string;
  description: string;
  url: string;
}

interface ArticleListProps {
  articles: Article[];
}

const ArticleList = ({ articles }: ArticleListProps) => {
  console.log(articles,'articles')
  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <div key={index}>
          <Card>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              {/* <CardDescription></CardDescription> */}
            </CardHeader>
            <CardContent>
              <p>{article.description}</p>
            </CardContent>
            <CardFooter>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
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
