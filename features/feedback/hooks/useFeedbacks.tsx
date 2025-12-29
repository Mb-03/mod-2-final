


import { useQuery } from "@tanstack/react-query";
import { fetchAllFeedbacks } from "../api/feedbackApi";

// ჩვეულებრივად useQuery - ით, მოგვაქ ყველა feedbacki

export function useAllFeedbacks() {
  return useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchAllFeedbacks,
  });
}
