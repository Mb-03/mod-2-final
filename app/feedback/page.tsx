"use client";

import { FeedbackCard } from "@/features/feedback/components/composites/FeedbackCard";
import { useDeleteFeedback } from "@/features/feedback/hooks/useDeleteFeedback";
import { useAllFeedbacks } from "@/features/feedback/hooks/useFeedbacks";
import { Trash } from "lucide-react";
import Link from "next/link";

const FeedbacksPage = () => {
  const { data: feedbackList, isLoading } = useAllFeedbacks();
  const { mutate } = useDeleteFeedback();

  if (isLoading) return <div className="mt-40 text-center">Loading...</div>;

  return (
    <div className="mt-5 mb-5 max-w-3xl mx-auto flex flex-col gap-5 px-4 ">
      {feedbackList?.map((feedback) => (
        <div className="relative">
          <button
            className="absolute bottom-3 right-6"
            onClick={() => {
              const confirmed = confirm(
                "Are you sure you want to delete this feedback?"
              );
              if (!confirmed) return;
              mutate(feedback._id);
            }}
          >
            <Trash className="cursor-pointer hover:fill-red-500" />
          </button>
          <FeedbackCard
            key={feedback._id}
            feedback={feedback}
            href={`feedback/${feedback._id}`}
          />
        </div>
      ))}

      <Link href={"feedback/form"} className="mt-5 min-h-10 min-w-10 bg-slate-500 rounded-lg text-center py-4 text-white cursor-pointer hover:bg-slate-700">
        <h3>Submit your Feedback</h3>
      </Link>
    </div>
  );
};

export default FeedbacksPage;
