import { useQuery } from "@tanstack/react-query";
import { getFeedback } from "../api/feedbackApi";

export function useSingleFeedback(id: string) {
  return useQuery({
    queryKey: ["feedback", id],
    queryFn: () => getFeedback(id),
    enabled: !!id
  });
}
