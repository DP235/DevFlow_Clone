import { NextResponse } from "next/server";

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<undefined> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface GTag {
  _id: string;
  name: string;
  questions?: number;
  // showCount?: boolean;
  // compact?: boolean;
}

interface GAuthor {
  _id: string;
  name: string;
  image: string;
}

interface GQuestion {
    _id: string;
    title: string;
    content: string;
    tags: GTag[];
    author: GAuthor;
    upvotes: number;
    downvotes: number;
    answers: number;
    views: number;
    createdAt: Date;
}

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}

interface PaginatedSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
}

interface GAnswer {
  _id: string;
  author: GAuthor;
  content: string;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  question: string;
}

interface GUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  createdAt: Date;
}

interface GCollection {
  _id: string;
  author: string | GAuthor;
  question: GQuestion;
}

interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}