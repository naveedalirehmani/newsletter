import React, { useState } from 'react';
import ArticleFilter from '../components\u0017/custom/filter';
import ArticleList from '../components\u0017/custom/articlesList';
import { Separator } from '../components\u0017/ui/separator';

interface Article {
  title: string;
  description: string;
  url: string;
  source : string;
}

export const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">News Aggregator</h1>
      <ArticleFilter setArticles={setArticles} />
      <Separator className="my-10"/>
      <ArticleList articles={articles} />
    </div>
  );
};

export default Articles;
