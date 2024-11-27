import React,{useState , useCallback , useMemo,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchStates, addState,deleteState,updateState ,clearError} from "../store/redux/stateSlice";
import { fetchCountries } from "../store/redux/countrySlice";
import StateForm from '../components/StateForm';
import StateTable from '../components/StateTable';

const State =  () => {

  const dispatch = useDispatch();
  const {  countrylist } = useSelector((state) => state.countries);
  const { statelist, error } = useSelector((state) => state.states); 
  const [search , setSearch] = useState('');
    const [ state, setstate] =useState({
      id : "",  
      country_id : "",
      state_name : ""
      });
      const [submit , setSubmit] =useState(false);
    
      useEffect(() => {
        dispatch(fetchCountries());
        dispatch(fetchStates());
    }, [dispatch,state]);



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

      const filteredStates = useMemo(() => {
        return statelist.filter((state) => {
          const country = countrylist.find((countryList) => countryList.id == state.country_id);
          const countryName = country ? country.country_name.toLowerCase() : '';
          return Object.values(state).some((value) =>
            String(value).toLowerCase().includes(search))|| countryName.includes(search);
        });
      }, [statelist,countrylist, search]);

    
        return (
            <><div className="mr-2 p-4 text-center bg-gray-200 ">
              <NavLink to={'/'}><button  className="text-white bg-green-500 w-1/4 m-1 py-2 text-lg rounded hover:bg-green-700"  >Register User</button></NavLink>
      <NavLink to={'/country'}><button  className="text-white bg-green-500 w-1/4 m-1 py-2 text-lg rounded hover:bg-green-700"  >Add Country</button></NavLink>
      <NavLink to={'/state'}><button  className="text-white bg-green-500 w-1/4 m-1 py-2 text-lg rounded hover:bg-green-700"  >Add State</button></NavLink>
              <div className='flex justify-center items-center min-h-screen bg-gray-200'>
                
                <StateForm 
                   countries={countrylist}
                   state={state} 
                   setstate={setstate} 
                   submit={submit} 
                   setSubmit={setSubmit} 
                />
      
    <div className="flex-auto mr-2 text-center">
    <StateTable
          countries={countrylist}
          states={filteredStates}
          setstate={setstate}
          setSubmit={setSubmit}
          handleSearch={handleSearch}
          search={search}
          error={error}
        />
      
    </div>
    </div>
    </div></>
        )
}

export default State;