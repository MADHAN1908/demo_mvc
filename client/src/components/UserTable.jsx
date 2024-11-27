import React,{ useMemo, useCallback } from 'react';
import { useDispatch  } from "react-redux";
import { deleteUser } from "../store/redux/userSlice";

const UserTable = ({ countries , states, users, setuser, setcountry, setSubmit, setFormVisible, handleSearch, search, error }) =>  {

    const dispatch = useDispatch();
  
    const editUser = useCallback((userlist) => {
      let expireDate = userlist.formatted_expire_date.split('T')[0]; 
      let currentDate = new Date();
      currentDate = currentDate.toISOString().split('T')[0]; 
     let expireDateObj = new Date(expireDate);
     let currentDateObj = new Date(currentDate);
     const diffTime =  expireDateObj - currentDateObj;
     const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setuser({
        id : userlist.id,
        name :userlist.username ,
        organization : userlist.organisation,
        mobile_no : userlist.mobile_no,
        email : userlist.email,
        password : userlist.password,
        photo  : "",
        no_of_users : userlist.no_of_users,
        country : userlist.country,
        state : "",
        expire_days : days,
        expire_date :userlist.formatted_expire_date
      });
      setcountry(userlist.country);
      setuser((prev) => ({...prev , state : userlist.state}));
      setSubmit(true);
      setFormVisible(true);
    });
    
    const display = useMemo(() => (
      users.map((userlist) => { 
        
        // console.log("Filtered Users:", filteredUsers);
        let expireDate = userlist.formatted_expire_date.split('T')[0]; 
      let currentDate = new Date();
      currentDate = currentDate.toISOString().split('T')[0]; 
     let expireDateObj = new Date(expireDate);
     let currentDateObj = new Date(currentDate);
     const diffTime =  expireDateObj - currentDateObj;
     const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const Country = countries.find((countryList) => countryList.id == userlist.country);
        const State = states.find((stateList) => stateList.id == userlist.state);
        return (
        <tr key={userlist.id} className={days <= 5 ? days <= 0 ? "bg-red-300" : "bg-yellow-300" : ""}>
              <td className="border border-gray-500 px-1 py-1">{userlist.id}</td>
              <td className="border border-gray-500 px-1 py-1"><img src={`http://localhost:5000${userlist.photo}`} className="w-24 h-24 rounded-full" alt="User Photo" /></td>
              <td className="border border-gray-500 px-1 py-1">{userlist.username} </td>
              <td className="border border-gray-500 px-1 py-1">{userlist.organisation} </td>
              <td className="border border-gray-500 px-1 py-1">{userlist.mobile_no} </td>
              <td className="border border-gray-500 px-1 py-1">{userlist.email} </td>
              <td className="border border-gray-500 px-1 py-1">{userlist.no_of_users} </td>
              <td className="border border-gray-500 px-1 py-1">{State.state_name} </td>
              <td className="border border-gray-500 px-1 py-1">{Country.country_name}</td>
              <td className="border border-gray-500 px-1 py-1">{userlist.formatted_expire_date}</td>
              <td className="border border-gray-500 px-1 py-1"><button className="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" onClick={() => {editUser(userlist)}} ><i className="fas fa-edit"></i></button></td>
              <td className="border border-gray-500 px-1 py-1"><button className="text-white bg-red-500 w-full py-2 text-lg rounded hover:bg-red-700" onClick={() => { dispatch(deleteUser(userlist.id))}} ><i className="fas fa-trash-alt"></i></button></td></tr>
        )
})
    ), [users,countries,states,dispatch]);
  
    return (
  <>
    <h2 className="text-blue-800 text-center text-3xl mb-4">User Details </h2>
    {error && <p className='text-red-500 text-lg bg-gray-300'>{error}</p>}
    <table className="table-auto border-2 border-blue-800 border-separate  bg-gray-100 w-full" id="itemList">
      <thead>
      <tr className='bg-gray-300'>
          <th colSpan={12} className="border-2 border-blue-800">
            <div className="flex items-center mb-2">
              <label className="flex-auto text-lg mr-2 text-right font-semibold" htmlFor="search">Search :</label>
              <div className="flex-1">
        <input type="text" id='search' placeholder="Search" value={search}  onChange={handleSearch} className="border-2 border-gray-300 p-2 rounded w-full" />
      </div>
      </div>
      </th>
          </tr>
    <tr className='bg-gray-300'>
        <th className="border-2 border-blue-800 px-1 py-1">ID</th>
        <th className="border-2 border-blue-800 px-1 py-1">Photo</th>
        <th className="border-2 border-blue-800 px-1 py-1">Name</th>
        <th className="border-2 border-blue-800 px-1 py-1">Organization</th>
        <th className="border-2 border-blue-800 px-1 py-1">Mobile No</th>
        <th className="border-2 border-blue-800 px-1 py-1">Email</th>
        <th className="border-2 border-blue-800 px-1 py-1">No of Users</th>
        <th className="border-2 border-blue-800 px-1 py-1">State</th>
        <th className="border-2 border-blue-800 px-1 py-1">Country</th>
        <th className="border-2 border-blue-800 px-1 py-1">Expire Date</th>
        <th className="border-2 border-blue-800 px-1 py-1">Edit</th>
        <th className="border-2 border-blue-800 px-1 py-1">Delete</th>
      </tr>
      </thead>
      <tbody>
      { display }
      </tbody>
    </table>
    </>
   ); 
}

export default UserTable;