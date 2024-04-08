import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Review from "../models/review";
import { ReviewType } from "../shared/types";
import verifyToken from "../middleware/auth";

const router = express.Router();

// Route to create a new review
router.post(
  "/",
  verifyToken,
  [
    // Validation for required fields
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  async (req: Request, res: Response) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Extract review details from request body
      const newReview: ReviewType = req.body;
      // Retrieve first name and last name from the authenticated user
      //const { firstName, lastName } = req.currentUser;

      // Set first name, last name, user ID, and last updated date
      //newReview.firstName = firstName;
      //newReview.lastName = lastName;
      newReview.userId = req.userId;
      newReview.lastUpdated = new Date();

      // Create a new review document
      const review = new Review(newReview);
      // Save the new review to the database
      await review.save();

      // Send a successful response with the created review object
      res.status(201).send(review);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating review" });
    }
  }
);
router.get("/", async (req: Request, res: Response) => {
  try {
    // Récupérer toutes les Review
    const reviews = await Review.find();

     // Send the reviews as response
    res.json(reviews);
  } catch (error) {
    // Gérer les erreurs
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});


export default router;
