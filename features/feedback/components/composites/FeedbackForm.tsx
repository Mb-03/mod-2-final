"use client";

import { useForm } from "react-hook-form";
import { type FeedbackForm } from "../../types/feedbackTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { feedbackFormSchema } from "../../schemas/feedbackFormSchema";
import { useSubmitFeedback } from "../../hooks/useSubmitFeedback";
import { useEffect } from "react";

const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 0,
      message: "",
    },
  });

  const {
    mutate: submitFeedback,
    error,
    isSuccess,
    isPending,
  } = useSubmitFeedback();

  const onSubmit = (data: FeedbackForm) => {
    submitFeedback(data);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="Your name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="your.email@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium">
          Rating
        </label>
        <input
          {...register("rating", { valueAsNumber: true })}
          type="number"
          placeholder="Your review (1-5)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.rating && (
          <p className="mt-1 text-sm text-red-500">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          {...register("message")}
          placeholder="Your message here..."
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error instanceof Error ? error.message : "Failed to submit contact"}
        </div>
      )}

      {isSuccess && (
        <div className="p-3 bg-green-100 text-green-700 rounded-md">
          Thank you! Your message has been sent successfully.
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default FeedbackForm;
