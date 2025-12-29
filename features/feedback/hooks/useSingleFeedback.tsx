import { useQuery } from "@tanstack/react-query";
import { getFeedback } from "../api/feedbackApi";


// არგუმენტად გადავცემთ id - s, და მოგვაქ მხოლოდ ერთი feedback - i, ახალ გვერდზე, 
// enabled: !!id - ეს ნიშნავს რომ მარტო მაშინ გაეშვას როცა id არსებობს, ანუ ავტომატურად არ 
// გაეშვას კომპონენტის რენდერინგზე

export function useSingleFeedback(id: string) {
  return useQuery({
    queryKey: ["feedback", id],
    queryFn: () => getFeedback(id),
    enabled: !!id
  });
}
