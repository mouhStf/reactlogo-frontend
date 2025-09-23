export type User = null | {
  id:        number;
  prenom:    string;
  nom:       string;
  telephone: string;
  email:     string;
  avatarURL: string;
}

export type Media = {
  type: string;
  url: string;
}

export type Post = {
  id: number;
  title: string;
  content: string;
  medias: Media[];
}


