import { z } from "zod";

// სქემა Submit Feedback - სთვის, rating - ში .int, იმას შვება რო min და max თუ დავუწერ,
// უკვე იგულისხმება მინიმუმ რიცხვი 1 და მაქსიმუმ 5, ანუ 6 -ს ან 0-ს ვერ ჩაწერ


export const feedbackFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Maximum of 20 characthers"),
  email: z
    .email()
    .min(1, "Email is required")
    .max(30, "Maximum of 30 characthers"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Maximum of 500 characthers"),
  rating: z
    .number()
    .int()
    .min(1, "Minimum Rating is 1")
    .max(5, "Maximum Rating is 5"),
});

export type feedbackFormType = z.infer<typeof feedbackFormSchema>;
