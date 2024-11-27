import React, { useState ,useMemo, useCallback ,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries,clearError } from "../store/redux/countrySlice";
import CountryForm from '../components/CountryForm';
import CountryTable from '../components/CountryTable';

const Country = () => {

  const dispatch = useDispatch();
  const { countrylist,  error } = useSelector((state) => state.countries);  
  const [country , setCountry] =useState({ id:0, country  : "" });
    const [submit , setSubmit] =useState(false);
    const [search , setSearch] = useState('');
  
    useEffect(() => {
      dispatch(fetchCountries());
  }, [dispatch,country]);

  useEffect(() => {
    if (error) {
        const timeout = setTimeout(() => {
            dispatch(clearError());
        }, 5000);
        return () => clearTimeout(timeout); 
    }
}, [error, dispatch]);
  

    const handleSearch = useCallback((event) => {
      setSearch(event.target.value.toLowerCase());
    }, []);

    const filteredCountries = useMemo(() => {
      return countrylist.filter((country) => {
        return Object.values(country).some((value) =>
          String(value).toLowerCase().includes(search));
      });
    }, [countrylist, search]);

  
      return (
         <> 
    <div className="mr-2 p-4 text-center bg-gray-200">
    <NavLink to={'/'}><button  className="text-white bg-green-500 w-1/4 py-2 m-1 text-lg rounded hover:bg-green-700"  >Register User</button></NavLink>
    <NavLink to={'/country'}><button  className="text-white bg-green-500 w-1/4 py-2 m-1 text-lg rounded hover:bg-green-700"  >Add Country</button></NavLink>
    <NavLink to={'/state'}><button  className="text-white bg-green-500 w-1/4 py-2 m-1 text-lg rounded hover:bg-green-700"  >Add State</button></NavLink>
        <div className='flex justify-center items-center min-h-screen '> 
         <CountryForm country={country} setCountry={setCountry} submit={submit} setSubmit={setSubmit}/>
  <div className="flex-auto mr-2 text-center">
  
  <CountryTable
          countries={filteredCountries}
          setCountry={setCountry}
          setSubmit={setSubmit}
          handleSearch={handleSearch}
          search={search}
          error={error}
        />
  </div>
  </div></div></>
      );
}

export default Country;