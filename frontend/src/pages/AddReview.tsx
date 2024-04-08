//import ManageReviewForm from "../forms/ManageReviewForm/ManageReviewForm";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";

const AddReview = () => {
    const {data : currentUser}=useQuery(
        "fetchCurrentUser",
        apiClient.fetchCurrentUser
    );
    console.log(currentUser?.email);
    return <></>;
    //return <ManageReviewForm />;
};

export default AddReview;
