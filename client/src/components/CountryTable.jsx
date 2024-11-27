import React, { useMemo, useCallback } from 'react';
import { useDispatch } from "react-redux";
import { deleteCountry } from "../store/redux/countrySlice";

const CountryTable = ({ countries, setCountry, setSubmit, handleSearch, search, error }) => {

  const dispatch = useDispatch();

    const editCountry = useCallback((country_list) => {
      setCountry({
        id : country_list.id,
        country : country_list.country_name
      });
      setSubmit(true);
    },[setCountry,setSubmit]);


    const display = useMemo(() => (
      countries.map((countryList) => (
        <tr key={countryList.id} >
          <td className="border-2 border-gray-300 px-4 py-2">{countryList.id }</td>
          <td className="border-2 border-gray-300 px-4 py-2">{countryList.country_name}</td>
          <td className="border-2 border-gray-300 px-4 py-2">
            <button className="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" 
            onClick={() => editCountry(countryList)}><i className="fas fa-edit"></i></button>
          </td>
          <td className="border-2 border-gray-300 px-4 py-2">
            <button className="text-white bg-red-500 w-full py-2 text-lg rounded hover:bg-red-700" 
            onClick={() => dispatch(deleteCountry(countryList.id))}><i className="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      ))
    ), [countries,dispatch,editCountry]);
  
      return (
         <> 
    <h2 className="text-blue-800 text-center text-3xl mb-4">Country List</h2>
    {error && <p className='text-red-500 text-lg bg-gray-300'>{error}</p>}

    <table className="table-auto border-2 border-blue-900 border-separate  bg-gray-100 w-full" id="country_list">
      <thead>
      <tr className='bg-gray-300'>
          <th colSpan={4} className="border-2 border-blue-800" >
            <div className="flex items-center mb-2">
              <label className="flex-auto text-lg mr-2 text-right font-semibold" htmlFor="search">Search :</label>
              <div className="flex-1">
        <input type="text" id='search' placeholder="Search" value={search}  onChange={handleSearch} className="border-2 border-gray-300 p-2 rounded w-full" />
      </div>
      </div>
      </th>
          </tr>
    <tr className='bg-gray-300'>
        <th className="border-2 border-blue-800 px-4 py-2">ID</th>
        <th className="border-2 border-blue-800 px-4 py-2">Country</th>
        <th className="border-2 border-blue-800 px-4 py-2">Edit</th>
        <th className="border-2 border-blue-800 px-4 py-2">Delete</th>
      </tr>
      </thead>
      <tbody>
      {display }
      </tbody>
    </table>
      </>
      );
}

export default CountryTable;