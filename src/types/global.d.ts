type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

export interface Tag {
  _id: string;
  name: string;
  // questions: number;
  // showCount?: boolean;
  // compact?: boolean;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

export interface Question {
    _id: string;
    title: string;
    description: string;
    tags: Tag[];
    author: Author;
    upvotes: number;
    answers: number;
    views: number;
    createdAt: Date;
}