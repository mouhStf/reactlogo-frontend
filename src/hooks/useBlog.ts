import { useCallback, useState } from "react";
import { Article, BlogPost, BlogPostSide, ArticleCategory, Tag } from "../types";
import { apiFetch } from "../utils/api";


export type BlogData = null | {
	articles: Article[];
	pages: number;
  current: number;
}

export function useBlog() {

  const [articles, setArticles] = useState<BlogData>(null);
  const [blogPost, setBlogPost] = useState<BlogPost>(null);
  const [blogPostSide, setBlogPostSide] = useState<BlogPostSide>(null);
  const [categories, setCategories] = useState<ArticleCategory[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [articlesLoading, setArticlesLoading] = useState(false);
  const getArticles = useCallback((page: number = 1, category: number = 0, tags: number[] = []) => {

    let params = ""
    tags.forEach((t, i) => {
      params = `${params}&tag=${t}`
    });

    setArticlesLoading(true);

    apiFetch<BlogData>(`/api/blog?page=${page}&category=${category}${params}`).then(data => {
      setArticles({...data, current: page})
    }).catch(err => {
        console.log("Could not fetch articles")
      }).finally(() => setArticlesLoading(false));
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

  const getCategories = useCallback(() => {
    apiFetch<ArticleCategory[]>("/api/blog/categories").then(data => {
      setCategories(data);
    }).catch(err => {
        console.log("Could not get categories", err)
      });
  }, []);
  const getTags = useCallback(() => {
    apiFetch<Tag[]>("/api/blog/tags").then(data => {
      setTags(data);
    }).catch(err => {
        console.log("Could not get tags", err)
      });
  }, []);

  const [articleSearchResult, setArticleSearchResult] = useState<BlogData>(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchArticles = useCallback((
    pattern: string,
    tags: number[] = [],
    category: number = -1,
    page: number = 1,
  ) => {
    let params = ""
    if (pattern) params = `term=${encodeURIComponent(pattern)}`;
    if (category !== -1) {
      params = `${params}&category=${encodeURIComponent(category)}`
    }
    tags.forEach((t, i) => {
      params = `${params}&tag=${encodeURIComponent(t)}`
    });

    if (params) {
      setSearchLoading(true);
      console.log(`/api/blog/search?page=${page}&${params}`);
      apiFetch<BlogData>(`/api/blog/search?page=${page}&${params}`).then( data => {
        setArticleSearchResult({...data, current: page})
      }).catch( (err) => {
        console.log("Could not get search result", err);
      }).finally(() => setSearchLoading(false));
    } else {
      setArticleSearchResult(null);
    }
  }, []);

  return {
    articles, getArticles, articlesLoading,
    blogPost, getBlogPost,
    blogPostSide, getBlogPostSide,
    categories, getCategories,
    tags, getTags,
    articleSearchResult, searchArticles, searchLoading,
  };
}
