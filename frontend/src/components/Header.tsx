import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import image from "../assets/beyond-horizon-high-resolution-logo.png"

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    //instead of bg-blue-800:
    // style={{ backgroundColor: 'rgb(135, 206, 235)' }}
    <div className="bg-cyan-50 py-1 ">
      <div className="container mx-auto flex justify-between">
        {/* for the logo if its written :<span className="logo font-lobster text-3xl text-white font-bold tracking-tight"> */}
          <Link to="/"> 
          {/* <!-- Logo Container --> */}
            <div className="flex items-center">
                {/* <!-- Logo --> */}
                <a className="cursor-pointer">
                    <h3 className="text-2xl font-medium text-blue-500">
                        <img className="h-16 object-cover"
                            src= {image} alt="Store Logo"></img>
                    </h3>
                </a>
            </div>
          </Link>
        {/* </span> */}
        <span className="flex space-x-10">
          {/* my bookings and myhotels show only when user is logged in thanks to the function isLoggedIn  */}
          {isLoggedIn ? (
             <> 
             <Link
                className="flex items-center font-bold text-sm text-cyan-700 hover:text-cyan-500 "
                to="/my-bookings"
              >
                Chance Charm
              </Link>
             <Link
                className="flex items-center font-bold text-sm text-cyan-700 hover:text-cyan-500 "
                to="/my-reviews"
              >
                Reviews
              </Link>
              <Link
                className="flex items-center font-bold text-sm text-cyan-700 hover:text-cyan-500 "
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center font-bold text-sm text-cyan-700 hover:text-cyan-500"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              {/* the sign out button is made as another component  */}
              <SignOutButton />
            </>
          ) : ( 
            <Link
              to="/sign-in"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 flex items-center justify-center me-2 mb-2" // Added flex properties to center vertically
              style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              Sign In
            </Link>


           )} 
        </span>
      </div>
    </div>
  );
};

export default Header;