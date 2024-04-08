import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
//import video from "../assets/video3.mp4"; // Import the video file
import "./SignIn.css"; // Import the CSS file
import { AiOutlineUnlock } from "react-icons/ai";
import { BiUser } from "react-icons/bi";


export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="bg-slate-8OO border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
      <h2 className="text-4xl text-white font-bold text-center mb-6">
          Sign In
        </h2>
      <form className=" " onSubmit={onSubmit}>
        
        <div className="relative my-4">
          
              <label className="text-[15px] mb-3 block">
                Email
                <input
                    type="email"
                    className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="Enter email"
                    {...register("email", { required: "This field is required" })}
                  />
                  
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
              </label>
            <BiUser className="absolute top-4 right-4 "/>
            
            
            
            {/* for the little email logo  */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4" viewBox="0 0 682.667 682.667">
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                      </clipPath>
                    </defs>
                    <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                      <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                    </g>
              </svg> */}
        </div>
        
        
        
        
           <div className="mt-6">
              
              
               <label className="text-[15px] mb-3 block">
                  Password
                   <div className="relative flex items-center">
                      
                      <input
                        type="password"
                        className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="Enter password"
                        {...register("password", {
                          required: "This field is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                         <AiOutlineUnlock className="absolute top-4 right-4 "/>
                      
                      
                          {/* for the eye logo  */}
                          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                          </svg> */}
                    </div>
                      {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                      )}
                 </label>
          </div>
        
        <div className="mt-10">
        <button
          type="submit"
          className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-cyan-800 hover:bg-cyan-600 hover:text-white py-2 transition-colors duration-300"
        >
          Login
        </button>
        <span className="m-4">
          Not Registered?{" "}
          <Link className="text-cyan-800 font-semibold hover:underline hover:text-cyan-700 ml-1 " to="/register">
            Create an account here
          </Link>
        </span>
        </div>
      </form>
       


     
   
  </div>
  );
};

export default SignIn;

