"use client";

import { FeedbackCard } from "@/features/feedback/components/composites/FeedbackCard";
import { useDeleteFeedback } from "@/features/feedback/hooks/useDeleteFeedback";
import { useSingleFeedback } from "@/features/feedback/hooks/useSingleFeedback";
import { Trash } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const SingleFeedback = () => {
  const params = useParams();
  const { id } = params;
  const [deleted, setDeleted] = useState(false);

  // აქ id - ვიღებ პარამეტრებიდან, რო მერე წაშლის ფუნქციას გადავცე, deleted state- რო წაშლის მერე ტექსტი გამოვიდეს რო წაიშალა, და უკან დაბრუნების ლინკი გამოჩნდეს, დანარჩენი იგივე რაც ზოგად feedbacks- გვერდზე

  const {
    data: singleFeedback,
    isLoading,
    error,
  } = useSingleFeedback(id as string);
  const { mutate } = useDeleteFeedback();

  if (isLoading) return <div className="mt-40 text-center">Loading...</div>;



  if (deleted)
    return (
      <div className="mt-40 text-center">
        <p>Feedback Deleted successfully</p>
        <Link href="/feedback" className="text-blue-300 hover:text-blue-400">
          Go Back to all Posts
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-lg mt-10 relative">
      {singleFeedback && (
        <div>
          <button
            className="absolute bottom-3 right-6"
            onClick={() => {
              const confirmed = confirm(
                "Are you sure you want to delete this feedback?"
              );
              if (!confirmed) return;
              mutate(id as string);
              setDeleted(true);
            }}
          >
            <Trash className="cursor-pointer hover:fill-red-500" />
          </button>
          <FeedbackCard feedback={singleFeedback} />
        </div>
      )}
    </div>
  );
};

export default SingleFeedback;
