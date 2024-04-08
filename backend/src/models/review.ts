import mongoose, { Schema } from "mongoose";
import { ReviewType } from "../shared/types";

// Define the schema for the Review model
const reviewSchema = new Schema<ReviewType>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    title: { type: String, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    lastUpdated: { type: Date, required: true },
  }
);


// Create and export the Review model
const Review = mongoose.model<ReviewType>("Review", reviewSchema);
export default Review;

