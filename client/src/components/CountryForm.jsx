import React, { useCallback } from 'react';
import { useDispatch } from "react-redux";
import { addCountry,updateCountry } from "../store/redux/countrySlice";

const CountryForm = ({ country, setCountry, submit, setSubmit }) => {

  const dispatch = useDispatch();

  
    const getValue = useCallback((event) => {
      const {value} = event.target;
      setCountry((prev) => ({...prev, country : value}));
    },[]);
  
    const validateForm = useCallback(() => {
      if (!country.country) {
        alert("Country Name is required");
        return false;
      }else{
        return true;
      }
    },[country]);
 
   const submitForm = useCallback((event) => {
      event.preventDefault();
      if (validateForm()) {
        if(submit){
          dispatch(updateCountry(country));
         
        }else{
          dispatch(addCountry(country));
        }
        setCountry({ id:'' , country:''});
        setSubmit(false);
      }
    },[dispatch,validateForm,setCountry,setSubmit]);

      return (
         <> 
         <div className="flex-1 " >
    <div className="bg-gray-100 border-4 border-blue-800 w-96 p-5 rounded-md flex flex-col h-auto max-h-[450px] m-5 md:max-w-[375px]">
      <h1 className="text-blue-800 text-center text-3xl mb-4">Country</h1>
      <div className="flex items-center mb-2">
      <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="country">Country Name :</label>
      <div className="flex-2">
      <input type="text" id="country" name="country" placeholder="Country Name" className="w-full p-1 border border-gray-300 rounded" value={country.country} onChange={getValue}  />
      </div>
      </div>
  
      <div id="btn" className="flex items-center mb-2">
      <button onClick={submitForm} className="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700"  >{submit ? <>Update Country</> : <>Add Country</> }</button>
      </div>
    </div>
    </div>
  </>
      );
}

export default CountryForm;