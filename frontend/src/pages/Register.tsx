import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate,Link } from "react-router-dom";

//using type to tell from what fields it's going to have
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  //const{register} =useForm(); from the package that we imported (import { useForm } from "react-hook-form";)
  //useForm<RegisterFormData>(); to connect the type RegisterFormData to our form
  
  
  // a "mutation" refers to an operation that modifies data on the server, 
  // typically via an HTTP request like POST, PUT, or DELETE. 
  // It's called a "mutation" because it mutates the server-side data.
  // using the useMutation hook from react-query :used to define a mutation operation for user registration.
  const mutation = useMutation(apiClient.register, { //Initialize mutation to handle registration
    
    // Handle successful registration
    onSuccess: async () => {
        //  console.log("registration succesful!") //  for testing purposes
      showToast({ message: "Registration Success!", type: "SUCCESS" });
      // Invalidate token validation query
      await queryClient.invalidateQueries("validateToken");
      // Redirect user to home page
      navigate("/");
    },

     // Handle registration error
    onError: (error: Error) => {
      //  console.log("error.message!") //  for testing purposes
      // Display error message
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  
  // onSubmit is a function that is triggered when a form is submitted. 
  // Inside this function, handleSubmit is called with a callback function (data) which is executed when the form is submitted.
  // Within this callback function, mutation.mutate(data) is called to initiate the mutation operation defined earlier. This sends the form data to the server for registration.
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
     <div className="bg-slate-8OO border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
         
         <h2 className="text-4xl text-white font-bold text-center mb-6">Create an Account </h2>
            
            <form
              className=" "
              onSubmit={onSubmit}>
                {/* using the onSubmit function we created is going to get called when we submit the form or click the button or hit enter  */}
                {/* then its going to pass the data to the handle submit function which we get from the useform hook  */}
                {/* ,the handle submit function is going to do a bunch of validation and things behind the scenes to make sure things are okay  */}
                {/* and if it is then our function gets called that we pass to the handle submit function and we get the data */}
            
              
              {/* the reason we put the input inside the label is to tell that they're connected */}
              <div className="mb-10">
                  
                  <label className="text-[15px] mb-3 block">
                    First Name
                    <input
                      className="block w-96 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                      placeholder="Enter Firstname"
                      {...register("firstName", {
                        required: "This field is required",})}>
                      
                    </input>
                    {errors.firstName && (
                      <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                  </label>
              </div>
              
              <div className="mt-6">
                  
                  <label className="text-[15px] mb-3 block">
                    Last Name
                    <input
                      className="block w-96 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                      placeholder="Enter Lastname"
                      {...register("lastName", {
                        required: "This field is required",})}>
                      
                    </input>
                    {errors.lastName && (
                      <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                  </label>
              </div>
              
              <div className="mt-6">
                  
                  <label className="text-[15px] mb-3 block">
                    Email
                    
                    <input
                      type="email"
                      className="block w-96 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                      placeholder="Enter email"
                      {...register("email", { required: "This field is required" })}>
                    </input>

                    {errors.email && (
                      <span className="text-red-500">{errors.email.message}</span>
                    )}
                  </label>
              </div>
              
              <div className="mt-6">
                  
                  <label className="text-[15px] mb-3 block">
                    Password
                  
                    <input
                      type="password"
                      className="block w-96 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                      placeholder="Enter password"
                      {...register("password", {
                        required: "This field is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}>
                    </input>

                    {errors.password && (
                      <span className="text-red-500">{errors.password.message}</span>
                    )}
                  </label>
              </div>
              
              <div className="mt-6">
                  <label className="text-[15px] mb-3 block">
                    Confirm Password
                    
                    <input
                      type="password"
                      className="block w-96 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                      placeholder="Enter password"
                      {...register("confirmPassword", {
                        validate: (val) => {
                          if (!val) {
                            return "This field is required";
                            // to confirm the field is not empty 
                          } else if (watch("password") !== val) {
                            return "Your passwords do no match";
                            //to confirm the field match the password
                          }
                        },
                      })}>
                    </input>

                    {errors.confirmPassword && (
                      <span className="text-red-500">
                        {errors.confirmPassword.message}
                      </span>
                    )}

                  </label>
            
              </div>
              
              
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-cyan-800 hover:bg-cyan-600 hover:text-white py-2 transition-colors duration-300"> 
                            Create Account
                        </button>

                    </div>
                    <span className="m-4">
          already have an account?{" "}
          <Link className="text-cyan-800 font-semibold hover:underline hover:text-cyan-700 ml-1 " to="/sign-in">
            Sign in here
          </Link>
        </span>
              
            </form>
            
            
             
          </div>
        
  );
};

export default Register;