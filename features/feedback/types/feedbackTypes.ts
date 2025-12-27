export type Feedback = {
  status: "pending" | "reviewed" | "resolved";
  _id: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};


export type FeedbackForm = {
    name: string,
    email: string,
    message: string,
    rating: number,

}

export type FeedbackResponse = {
    message: string
}
