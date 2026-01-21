import z from "zod";

export const courseLevels = ["beginner", "intermediate", "advanced"] as const;

export const courseStatus = ["draft", "published", "archived"] as const;

export const courseCategories = [
    "Development",
    "Businceness",
    "Finance",
    "It & Software",
    "Personal Development",
    "Design",
    "Marketing",
    "Health & Fitness",
    "Music",
    "Teaching & Academics",
] as const;

export const courseSchema = z.object({
    title: z
        .string()
        .min(3,{message: "Title must be at least 3 characters long"})
        .max(100,{message: "Title must be at most 100 characters long"}),
    description: z.string().min(3, {message: "Description must be at least 3 characters long"}),
    fileKey: z.string().min(1, {message: "File is required"}),
    price: z.number().min(1, {message: "Price must be a positive number"}),
    duration: z.number()
    .min(1, {message: "Duration must be at least 1 hour"})
    .max(500, {message: "Duration must be at most 500 hours"}),
    level: z.enum(courseLevels),
    category: z.enum(courseCategories, {message: "Category is required"}),
    smallDescription: z.string().min(3, {message: "Small description must be at least 3 characters long"}).max(200, {message: "Small description must be at most 200 characters long"}),
    slug: z.string().min(3, {message: "Slug must be at least 3 characters long"}),
    status: z.enum(courseStatus, {message: "Status is required"}),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
export type CourseInputType = z.input<typeof courseSchema>;