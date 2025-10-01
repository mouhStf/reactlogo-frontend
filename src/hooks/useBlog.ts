import { useCallback, useState } from "react";
import { Article, BlogPost, BlogPostSide } from "../types";
import { apiFetch } from "../utils/api";

export function useBlog() {

  const [articles, setArticles] = useState<Article[]>([]);
  const [blogPost, setBlogPost] = useState<BlogPost>(null);
  const [blogPostSide, setBlogPostSide] = useState<BlogPostSide>(null);

  const getArticles = useCallback(() => {
    apiFetch<Article[]>("/api/blog").then(data => {
      setArticles(data);
    }).catch(err => {
        console.log("Could not fetch articles")
      });
  }, []);

  const getBlogPost = useCallback((id: number) => {
    apiFetch<BlogPost>(`/api/article/${id}`).then(data => {
      setBlogPost(data);
    }).catch(err => {
        console.log("Could not fetch article data")
      });
  }, []);

  const getBlogPostSide = useCallback((id: number) => {
    apiFetch<BlogPostSide>('/api/article/side').then(data => {
      setBlogPostSide(data);
    }).catch(err => {
        console.log("Could not fetch side data")
      });
  }, []);

  return {articles, getArticles, blogPost, getBlogPost, blogPostSide, getBlogPostSide};
}
