import { useFormContext } from "react-hook-form";
import { ReviewFormData } from "./ManageReviewForm";

const ReviewFormSection = () => {
  // Access form methods and errors from the form context
  const {
    register, // Function to register form inputs
    formState: { errors }, // Object containing form errors
  } = useFormContext<ReviewFormData>(); // Hook to access form context and its data

  return (
    <div className="flex flex-col gap-4">
      {/* Review section title */}
      <h1 className="text-3xl font-bold mb-3">Add Review</h1>

      {/* Input field for first name */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        First Name
        <input
          className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          type="text"
          readOnly // Make input read-only
          disabled // Disable input
          {...register("firstName")} // Register input with react-hook-form
        />
      </label>

      {/* Input field for last name */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Last Name
        <input
          className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          type="text"
          readOnly // Make input read-only
          disabled // Disable input
          {...register("lastName")} // Register input with react-hook-form
        />
      </label>

      {/* Input field for review title */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Title
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("title", { required: "Title is required" })} // Register input with validation
        />
        {/* Display error message if title is not provided */}
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </label>

      {/* Input field for review description */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={5}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "Description is required" })} // Register input with validation
        />
        {/* Display error message if description is not provided */}
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>

      {/* Input field for star rating */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Star Rating
        <select
          {...register("starRating", {
            required: "Star rating is required",
          })} // Register select input with validation
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          {/* Default option */}
          <option value="" className="text-sm font-bold">
            Select a Rating
          </option>
          {/* Generate options (liste deroulante)for star ratings */}
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {/* Display error message if star rating is not provided */}
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default ReviewFormSection;
