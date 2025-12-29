import { useMutation } from "@tanstack/react-query";
import { postFeedback } from "../api/feedbackApi";
import { FeedbackForm } from "../types/feedbackTypes";


// მართივი POST რექუესთი, რომელსაც არგუმენტად გადავცემთ form - ში შეყვანილ data- ს


export function useSubmitFeedback() {
    return useMutation({
        mutationFn: (feedbackData: FeedbackForm) => postFeedback(feedbackData)
    })
}