import Link from "next/link";
import { Feedback } from "../../types/feedbackTypes";
import RatingStars from "../primitives/Stars";

const statusStyles = {
  pending: "border-yellow-300 bg-yellow-50",
  reviewed: "border-blue-300 bg-blue-50",
  resolved: "border-green-300 bg-green-50",
};

type FeedbackCardProps = {
  feedback: Feedback;
  href?: string;
};



export function FeedbackCard({ feedback, href }: FeedbackCardProps) {





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
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}
