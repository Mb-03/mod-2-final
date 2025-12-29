import Link from "next/link";
import { Feedback } from "../../types/feedbackTypes";
import RatingStars from "../primitives/Stars";
import { useState } from "react";
import { useEditFeedback } from "../../hooks/useEditFeedback";
import { Edit } from "lucide-react";

const statusStyles = {
  pending: "border-yellow-300 bg-yellow-50",
  reviewed: "border-blue-300 bg-blue-50",
  resolved: "border-green-300 bg-green-50",
};

type FeedbackCardProps = {
  feedback: Feedback;
  href?: string;
};

// ეს არი თვითონ feedback - ის ქარდი, href - s გადავცემ რო თუ დაჭერისას მინდა რო გვერდზე გადადიოდეს ეს პროპსით გადავცე, და თუ უკვე გადასულია, აღარ გადავცემ რო თავიდან აღარ დაამატოს იგივე url - და არ არსებულ გვერდზე გადავიდეს. 
// state - ში ვინახავ select - ის values, ანუ არჩეულ სტატუს, default ექნება ის სტატუსი რომელიკც ბექზე აქვს.

// და backgrounds და borders ვუცვლი სტატუსზე დამოკიდებით, უბრალო მინიმალური დიზაინი

export function FeedbackCard({ feedback, href }: FeedbackCardProps) {
  const [status, setStatus] = useState<"pending" | "resolved" | "reviewed">(
    feedback.status
  );

  const { mutate: editFeedback } = useEditFeedback();

  const content = (
    <div
      className={`rounded-xl cursor-pointer  border p-5 shadow-sm transition hover:shadow-md min-h-45 ${
        statusStyles[feedback?.status]
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-gray-900">{feedback?.name}</p>
          <p className="text-sm text-gray-500">{feedback?.email}</p>
        </div>
        <RatingStars rating={feedback?.rating} />
      </div>

      <p className="text-gray-700 leading-relaxed mb-4">{feedback?.message}</p>

      <div className="text-xs text-gray-400 flex justify-between">
        <span>{new Date(feedback?.createdAt).toLocaleDateString()}</span>
        <span className="capitalize">{feedback?.status}</span>
      </div>
      <select
        className="mt-5 border rounded-lg px-3 py-1"
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as "pending" | "resolved" | "reviewed")
        }
      >
        <option value="resolved">Resolved</option>
        <option value="reviewed">Reviewed</option>
      </select>
      <button
        className="absolute bottom-3 right-15"
        onClick={() => {
          editFeedback({
            id: feedback._id,
            statusValue: status,
          });
        }}
      >
        <Edit className="cursor-pointer hover:fill-green-400" />
      </button>
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}
