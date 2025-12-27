import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editStatus } from "../api/feedbackApi";

export function useEditFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => editStatus(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["feedbacks"] }),
  });
}
