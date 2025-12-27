


import { useQuery } from "@tanstack/react-query";
import { fetchAllFeedbacks } from "../api/feedbackApi";

export function useAllFeedbacks() {
  return useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchAllFeedbacks,
  });
}
