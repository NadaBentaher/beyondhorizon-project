import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { HotelType } from "../shared/types";

const router = express.Router();

//Multer middleware de gestion des fichiers pour Express.js
//Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Route to add a new hotel
router.post(
  "/",
  verifyToken,
  [
    // Validation for required fields
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  // Multer middleware for handling file uploads
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      // Extract uploaded image files
      const imageFiles = req.files as Express.Multer.File[];
      // Extract  details from request body
      const newHotel: HotelType = req.body;
      // Upload images to cloudinary and get image URLs
      const imageUrls = await uploadImages(imageFiles);

      // Add image URLs and other details to the new hotel object
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      // Create a new Hotel instance with the provided details
      const hotel = new Hotel(newHotel);
      // Save the new hotel to the database
      await hotel.save();

      // Send a successful response with the created hotel object
      res.status(201).send(hotel);
    } catch (e) {
      // Handle errors
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);
// Route to fetch hotels belonging to the authenticated user
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
     // Find hotels associated with the authenticated user
    const hotels = await Hotel.find({ userId: req.userId });
    // Send the list of hotels as a JSON response
    res.json(hotels);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

// Route to fetch a specific hotel belonging to the authenticated user
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    // Find the hotel by its ID and user ID
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    // Send the hotel details as a JSON response
    res.json(hotel);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "Error fetching hotels" });
  }
});
// Route to update a hotel by its ID
router.put(
  "/:hotelId",
  verifyToken,
  // Multer middleware for handling file uploads
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      // Extract updated hotel details from request body
      const updatedHotel: HotelType = req.body;
      // Set the last updated timestamp
      updatedHotel.lastUpdated = new Date();

      // Find and update the hotel by its ID and user ID
      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      // Handle if the hotel is not found
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      // Upload new images and update the hotel's image URLs
      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];
       // Save the updated hotel
      await hotel.save();
      // Send the updated hotel as a JSON response
      res.status(201).json(hotel);
    } catch (error) {
       // Handle errors
      res.status(500).json({ message: "Something went throw" });
    }
  }
);

// Function to upload images to cloudinary and get image URLs
async function uploadImages(imageFiles: Express.Multer.File[]) {
   // Map each image file to an upload promise
  const uploadPromises = imageFiles.map(async (image) => {
    // Convert the image buffer to base64(so that it can be posted at cloudinary)
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });
  // Wait for all upload promises to resolve(exécutée avec succès) and get the image URLs
  const imageUrls = await Promise.all(uploadPromises);
  // Return the array of image URLs
  return imageUrls;
}
// Export the router module
export default router;
