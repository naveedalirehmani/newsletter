import { useMutation } from '@tanstack/react-query';
import ArticleService from '../services/articles/article.service';
import { FetchArticlesProps, Article } from './fetchArticles';
import { useState } from 'react';

export function useFetchArticles() {
  const [isFormLoading, setFormLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: (filters: FetchArticlesProps) => ArticleService.fetchArticles(filters),
    onSuccess: (articles: Article[]) => {
      setFormLoading(false);
    },
    onError: (error: Error) => {
      console.error("Error fetching articles:", error);
      setFormLoading(false);
    },
  });

  return {
    mutation,
    formStatus: {
      isFormLoading,
      setFormLoading,
    },
  };
}
