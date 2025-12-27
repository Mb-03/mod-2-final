import { useMutation } from "@tanstack/react-query";
import { postFeedback } from "../api/feedbackApi";
import { FeedbackForm } from "../types/feedbackTypes";

export function useSubmitFeedback() {
    return useMutation({
        mutationFn: (feedbackData: FeedbackForm) => postFeedback(feedbackData)
    })
}