// user enters a destination ,an adult count a child count ,check in and check out dates
// when they hit search ,we're going to take the criteria that they entered
// then store that in a serach context
// then redirect them to the search page   



// import "../components/SearchBar.css"
import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
 
const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
  
    <form
      onSubmit={handleSubmit}
      className="p-5 bg-slate-400 border border-slate-400 shadow-2xl backdrop-filter backdrop-blur-lg bg-opacity-30 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
      style={{ marginTop: "-5.4rem" }} // Adjust the margin top as needed
    >

        <div className="flex flex-row items-center flex-1 ">
          <MdTravelExplore size={25} className="mr-1 text-black" />
          <input
            placeholder="Where are you going?"
            className="text-md w-full focus:outline-nonemin-w-full bg-white p-2 focus:outline-none  rounded-full  "
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>

        <div  style={{ width: "201px" , marginRight: "20px" }} // Adjust width as needed 
        className="flex flex-row items-center px-2 py-1 gap-2 min-w-full bg-white p-2 focus:outline-none  rounded-full text-gray-400 ">
          <label className="items-center flex">
            Adults:
            <input
              className="w-full p-1 focus:outline-none font-bold bg-white text-gray-700"
              type="number"
              
              min={1}
              max={20}
              value={adultCount}
              onChange={(event) => setAdultCount(parseInt(event.target.value))}
            />
          </label>
          <label className="items-center flex" >
            Children:
            <input
              className="w-full p-1  focus:outline-none font-bold bg-white text-gray-700"
              type="number"
              
              min={0}
              max={20}
              value={childCount}
              onChange={(event) => setChildCount(parseInt(event.target.value))}
            />
          </label>
        </div>
        <div>
          <DatePicker
          
            selected={checkIn}
            onChange={(date) => setCheckIn(date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-in Date"
            className="min-w-full bg-white p-2 focus:outline-none rounded-full text-gray-400"
            wrapperClassName="w-full"
            popperPlacement="top-start" // Set the popper placement
          />
        </div>
        <div>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText="Check-out Date"
            className="min-w-full bg-white p-2 focus:outline-none rounded-full text-gray-400"
            wrapperClassName="w-full"
            popperPlacement="top-start" // Set the popper placement
          />
        </div>
        <div className="flex flex-row justify-end gap-1" >
          <button className="w-2/3 h-full p-2 text-[18px]  rounded-full bg-indigo-800 text-white hover:bg-white hover:text-indigo-800 py-2 transition-colors duration-300">
            Search
          </button>
          <button className="w-1/3 h-full p-2 text-[18px]  rounded-full bg-cyan-600 text-white hover:bg-white hover:text-cyan-800 py-2 transition-colors duration-300">
            Clear
          </button>
        </div>
      </form>
     
  );
};

export default SearchBar;