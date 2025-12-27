import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeedback } from "../api/feedbackApi";
import { Feedback } from "../types/feedbackTypes";

export function useDeleteFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteFeedback(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      queryClient.cancelQueries({ queryKey: ["feedback"] });
    },
    onMutate: () => queryClient.cancelQueries({ queryKey: ["feedback"] }),
  });
}
