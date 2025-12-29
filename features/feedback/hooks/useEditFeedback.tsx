import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editStatus } from "../api/feedbackApi";
import { Feedback } from "../types/feedbackTypes";

// აქ optimistic update - ით გავაკეთე, რო სტატუსი ეგრევე შეიცვალოს და გვერდზე გამოჩნდეს,
// ობიექტად ვატან არგუმენტებს, რადგან ორი არგუმენტი მინდა ქონდეს, id და status - ი რომლითად უნდა შეიცვალოს

export function useEditFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      statusValue,
    }: {
      id: string;
      statusValue: "pending" | "resolved" | "reviewed";
    }) => editStatus(id, statusValue),
    // ბოლოში თავიდან გაუშვას GET request - ები
    // ყველაფერი ორჯერ მიწერია იმიტორო ორივეგან იმუშავოს, ყველას სადაც არის მანდაც რო შეიძლებოდეს edit - ი და ერთი კონკრეტულის გვერდზე რო გადავალ მაშინაც
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },

    // აქ მიწერია optimistic update - ის ნაწილი დოკუმენტაციიდან, 

    onMutate: async ({ id, statusValue }) => {
      await queryClient.cancelQueries({ queryKey: ["feedbacks"] }),
        await queryClient.cancelQueries({ queryKey: ["feedback"] });

        // ვინახავთ data - ს, ანუ რასაც აბრუნებენ get requestebi

      const previousStatus = queryClient.getQueryData(["feedbacks"]);
      const previousStatusSingle = queryClient.getQueryData(["feedback"]);


      // აქ map გვჭირდება რო გავიგოთ რომელ feedbacks- ზე გვჭირდება სტატუსის შეცვლა, თითო ცალკეული ობიექტისთვის ვადერებთ id - ს, თუ დაემთხვა ვცვლით ამ feedback - ის სტატუსს, თუ არა იგივეს ვტოვებთ, ქვემოთ map აღარ ჭირდება რადგან ისედაც 1 feedback გვაქვს გვერდზე

      queryClient.setQueryData<Feedback[]>(["feedbacks"], (old) =>
        old?.map((f) => (f._id === id ? { ...f, status: statusValue } : f))
      );

      queryClient.setQueryData<Feedback>(["feedback", id], (old) =>
        old ? { ...old, status: statusValue } : old
      );

      return { previousStatus, previousStatusSingle };
    },

    // error - ის შემთხვევაში გამოიტანოს ძველი, შეუცვლელი სტატუსი

    onError: (err, statusValue, context) => {
      queryClient.setQueryData(["feedbacks"], context?.previousStatus);
      queryClient.setQueryData(["feedback"], context?.previousStatusSingle);
    },
  });
}
