import { InteractionActionEnums } from '@/database/interaction.model';
import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .string()  
    .email('Invalid email address')
    .min(1, 'Email is required'),
    
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(50, 'Password must be at most 50 characters long'),
});

export const SignUpSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address.")
    .min(1, "Email is required."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(50, "Password cannot exceed 50 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character."),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(30, "Username cannot exceed 30 characters.")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),

  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Name cannot exceed 50 characters.")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces."),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, "Title is required.")
    .max(100, "Title cannot exceed 100 characters."),
  
  content: z
    .string()
    .min(1, "Body is required."),

  tags: z
    .array(
      z
        .string()
        .min(1, "Tag is required.")
        .max(30, "Tag cannot exceed 30 characters.")
    )
    .min(1, "At least one tag is required.")
    .max(3, "Cannot add more than 3 tags."),
});

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required."),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long."),
  email: z.string().email("Please provide a valid email address."),
  bio: z.string().optional(),
  image: z.string().url("Please provide a valid URL.").optional(),
  location: z.string().optional(),
  portfolio: z
    .string()
    .url("Please provide a valid URL.")
    .optional(),
  reputation: z.number().optional(),
});

export const AccountSchema = z.object({
  userId: z.string().min(1, "User ID is required."),
  name: z.string().min(1, "Name is required."),
  image: z.string().url("Please provide a valid URL.").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(50, "Password cannot exceed 50 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character.")
    .optional(),
  provider: z.string().min(1, "Provider is required."),
  providerAccountId: z.string().min(1, "Provider Account ID is required."),
});

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(["google"]),
  providerAccountId: z.string().min(1, "Provider Account ID is required."),
  user: z.object({
    name: z.string().min(1, "Name is required."),
    username: z.string().min(3, "Username must be at least 3 characters long."),
    email: z.string().email("Please provide a valid email address."),
    image: z.string().url("Invalid image URL").optional(),
  }),
});

export const EditQuestionSchema = AskQuestionSchema.extend({
  questionId: z.string().min(1, "Question ID is required."),
});

export const GetQuestionSchema = z.object({
  questionId: z.string().min(1, "Question ID is required."),
})

export const PaginatedSearchParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
})

export const GetTagQuestionsSchema = PaginatedSearchParamsSchema.extend({
  tagId: z.string().min(1, "Tag ID is required."),
})

export const IncrementViewsSchema = z.object({
  questionId: z.string().min(1, "Question ID is required."),
})

export const AnswerSchema = z.object({
  content: z
    .string()
    .min(100, "Answer has to have more than 100 characters."),
})

export const AnswerServerSchema = AnswerSchema.extend({
  questionId: z.string().min(1, "Question ID is required."),
})

export const GetAnswerSchema = PaginatedSearchParamsSchema.extend({
  questionId: z.string().min(1, "Question ID is required."),
})

export const AIAnswerSchema = z.object({
  question: z
    .string()
    .min(5, "Question is required.")
    .max(130, "Question cannot exceed 130 characters."),
  content: z
    .string()
    .min(100, "Answer has to have more than 100 characters."),
  userAnswer: z.string().optional(),
})

export const CreateVoteSchema = z.object({
  targetId: z.string().min(1, "Target ID is required."),
  targetType: z.enum(['question', 'answer'], { message: "Invalid target type." }),
  voteType: z.enum(['upvote', 'downvote'], { message: "Invalid target type." }),
})

export const UpdateVoteCountSchema = CreateVoteSchema.extend({
  change: z.number().int().min(-1).max(1),
})

export const HasVotedSchema = CreateVoteSchema.pick({
  targetId: true,
  targetType: true,
})

export const CollectionBaseSchema = z.object({
  questionId: z.string().min(1, "Question ID is required."),
})

export const GetUserSchema = z.object({
  userId: z.string().min(1, "User ID is required."),
})

export const GetUserQuestionsSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, "User ID is required."),
})

export const GetUserAnswersSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, "User ID is required."),
})

export const GetUserTagsSchema = z.object({
  userId: z.string().min(1, "User ID is required."),
})

export const DeleteQuestionSchema = z.object({
  questionId: z.string().min(1, "Question ID is required."),
})

export const DeleteAnswerSchema = z.object({
  answerId: z.string().min(1, "Answer ID is required."),
})

export const CreateInteractionSchema = z.object({
  action: z.enum(InteractionActionEnums),
  actionTarget: z.enum(["question", "answer"], { message: "Invalid type" }),
  actionId: z.string().min(1),
  authorId: z.string().min(1),
});