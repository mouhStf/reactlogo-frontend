export type User = null | {
  id:        number;
  prenom:    string;
  nom:       string;
  telephone: string;
  email:     string;
  avatarURL: string;
}

export type Markup =
  | {
      element: "p" | "h1" | "h2" | "h3";
      classe: string;
      data: string;
    }
  | {
      element: "img";
      classe: string;
      data: string; // image URL
    }
  | {
      element: "ul";
      classe: string;
      data: { data: string }[]; // list items
    }

export type Article = null | {
  id: number;
  authorId: number;
  title: string;
  categoryId: number;
  image: string;
  date: string;
  summary: string;
  content: Markup[];
}

export type Author = null | {
  id: number;
  name: string;
  title: string;
  summary: string;
}

export type ArticleCategory = null | {
  id: number;
  name: string;
}

export type Tag = null | {
  id: number;
  name: string;
}

export type Comment = null | {
	id: number;
	userid: number;
	date: string;
	comment: string;
}

export type UserComment = null | {
  user: User;
  comment: Comment;
}

export type BlogPost = null | {
  article: Article;
  category: ArticleCategory;
  tags: Tag[];
  author: Author;
  user: User;
  comments: UserComment[];
  n: number;
  next: Article;
  previous: Article;
  sims: Article[];
}

export type BlogPostSide = null | {
	categories: ArticleCategory[];
	tags: Tag[];
	recents: Article[];
}

export type CategoriesTags = null | {
	categories: ArticleCategory[];
	tags: Tag[];
}
