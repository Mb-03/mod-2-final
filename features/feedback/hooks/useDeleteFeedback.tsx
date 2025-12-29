import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeedback } from "../api/feedbackApi";


// აქაც ჩვეულებრივი useMuation - ი, უბრალოდ დამატებით გამოვიყენე invalidateQueries და cancelQueryeis, invalidateQueries ეს იმისთვის არი რომ რო წავშლით, თავიდან გამოიძახოს query აი ამ qyerykey - ით - { queryKey: ["feedbacks"] }, ანუ განახლებული data წამოიღოს, და cancelQueryeis ეს უიმისთვის დამჭირდა რო, რო წავშლიდი, ავტომატურად ცდილობდა მაინც მაგ id- ze get requests, და კონსოლში ერორი რო არ ყოფილიყო ვაუქმებ მაგ get requests წაშლის მერე.

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
