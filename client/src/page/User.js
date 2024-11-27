import React,{useState, useMemo, useCallback,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {fetchUsers, addUser,deleteUser,updateUser,clearError } from "../store/redux/userSlice";
import { fetchStates } from "../store/redux/stateSlice";
import { fetchCountries } from "../store/redux/countrySlice";
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';


const User = () =>  {

    const dispatch = useDispatch();
    const {userlist , error } = useSelector((state) => state.users);
    const {countrylist} = useSelector((state) => state.countries); 
    const {statelist} = useSelector((state) => state.states);
    const [FormVisible, setFormVisible] = useState(false);
    const [search , setSearch] = useState('');
    
    const toggleForm = () => {
      setFormVisible(!FormVisible);
    };
    
    const [ user, setuser] =useState({
      id : "",
      name : "",
      organization : "",
      mobile_no : "",
      email : "",
      password : "",
      photo  : "",
      no_of_users : "",
      country : "",
      state : "",
      expire_days : "",
      expire_date : ""
    });
    useEffect(() => {
      dispatch(fetchCountries());
      dispatch(fetchStates());
      dispatch(fetchUsers());

  }, [dispatch,user]);
 
    

    const [submit , setSubmit] =useState(false);
    const [country , setcountry] =useState("");
    

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
  
    const filteredUsers = useMemo(() => {
      return userlist.filter((user) => {
        const country = countrylist.find((countryList) => countryList.id == user.country);
        const countryName = country ? country.country_name.toLowerCase() : '';
        const State = statelist.find((stateList) => stateList.id == user.state);
        const stateName = State ? State.state_name.toLowerCase() : '';
        return (Object.values(user).some((value) =>
          String(value).toLowerCase().includes(search))|| countryName.includes(search)|| stateName.includes(search) );
      });
    }, [userlist,statelist,countrylist, search]);
  
    return (
      <div className="h-full bg-gray-200">
      <div className=" mr-2 p-4 text-center">
    <button onClick={toggleForm} className="text-white bg-green-500 w-1/4 py-2 text-lg m-1 rounded hover:bg-green-700" id="user_btn"  >{FormVisible ? "Close Form" : "Add User"}</button>
    <NavLink to={'/country'}><button  className="text-white bg-green-500 w-1/4 py-2 text-lg m-1 rounded hover:bg-green-700"  >Add Country</button></NavLink>
    <NavLink to={'/state'}><button  className="text-white bg-green-500 w-1/4 py-2 text-lg m-1 rounded hover:bg-green-700"  >Add State</button></NavLink>
    
    { FormVisible && 
    <UserForm 
       user ={user}
       countries={countrylist}
       states={statelist} 
       setuser={setuser}
       country={country} 
       setcountry={setcountry}
       setFormVisible={setFormVisible}
       submit={submit} 
       setSubmit={setSubmit}
    />
       }
  
    <UserTable 
       countries={countrylist}
       states={statelist}
       users={filteredUsers}
       setuser={setuser}
       setcountry={setcountry}
       setSubmit={setSubmit}
       setFormVisible={setFormVisible}
       handleSearch={handleSearch}
       search={search}
       error={error}
    />
  </div>
  </div>
   ); 
}

export default User;