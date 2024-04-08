import { useForm } from "react-hook-form";
import { ReviewType } from "../../../../backend/src/shared/types";
import { UserType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import ReviewFormSection from "./ReviewFormSection";

// Define the data structure for the review form
export type ReviewFormData = {
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  starRating: number;
};

type Props = {
  // Define the props required by the component
  currentUser: UserType; // Current user data
  review?: ReviewType; // Existing review data (optional)
  onSave: (reviewFormData: FormData) => void; // Callback function to save the review
  isLoading: boolean; // Loading state
};

const ManageReviewForm = ({ currentUser, onSave, isLoading, review }: Props) => {
  // Initialize form methods from react-hook-form
  const formMethods = useForm<ReviewFormData>();
  const { handleSubmit, reset } = formMethods;

  // Reset the form when the review or current user data changes
  useEffect(() => {
    // Set default values for the form fields
    reset({
      ...review,
      // Use currentUser data for firstName and lastName fields
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    });
  }, [currentUser, review, reset]);

  // Handle form submission
  const onSubmit = handleSubmit((formDataJson: ReviewFormData) => {
    // Prepare form data for submission
    const formData = new FormData();
    if (review) {
      // Append review ID if it exists (for updating existing review)
      formData.append("reviewId", review._id);
    }
    // Append form data fields to the FormData object
    formData.append("title", formDataJson.title);
    formData.append("description", formDataJson.description);
    formData.append("starRating", formDataJson.starRating.toString());

    // Invoke the onSave callback with the prepared form data
    onSave(formData);
  });

  // Render the review form
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        {/* Include the ReviewFormSection component */}
        <ReviewFormSection />        
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageReviewForm;
