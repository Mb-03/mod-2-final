import { safeFetch } from "@/features/lib/apiClient";
import {
  Feedback,
  FeedbackForm,
  FeedbackResponse,
} from "../types/feedbackTypes";

export const fetchAllFeedbacks = async (): Promise<Feedback[]> => {
  return safeFetch<Feedback[]>("/api/feedback/all", {
    method: "GET",
  });
};

export const getFeedback = async (id: string): Promise<Feedback> => {
  return safeFetch<Feedback>(`/api/feedback/${id}`);
};

export const postFeedback = async (
  feedbackData: FeedbackForm
): Promise<FeedbackForm> => {
  return safeFetch<FeedbackForm>("/api/feedback", {
    method: "POST",
    body: JSON.stringify(feedbackData),
  });
};

export const deleteFeedback = async (
  feedbackId: string
): Promise<FeedbackResponse> => {
  return safeFetch<FeedbackResponse>(`/api/feedback/${feedbackId}`, {
    method: "DELETE",
  });
};

export const editStatus = async (feedbackId: string): Promise<Feedback> => {
  return safeFetch<Feedback>(`/api/feedback/${feedbackId}`, {
    method: "PATCH",
  });
};
