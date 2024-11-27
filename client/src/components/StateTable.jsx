import React,{ useCallback , useMemo} from 'react';
import { useDispatch } from "react-redux";
import { deleteState} from "../store/redux/stateSlice";

const StateTable =  ({ countries ,states, setstate, setSubmit, handleSearch, search, error }) => {

  const dispatch = useDispatch();

  const editState = useCallback((statelist) => {
    setstate({
      id : statelist.id,
      country_id : statelist.country_id,
      state_name : statelist.state_name
    });
    setSubmit(true);
  },[setstate,setSubmit]);

      const display = useMemo(() => (
        states.map((statelist) => {
          const country = countries.find((countryList) => countryList.id == statelist.country_id);
          return (
          <tr key={statelist.id}>
             <td className="border-2 border-gray-300 px-4 py-2">{statelist.id}</td>
                <td className="border-2 border-gray-300 px-4 py-2">{country ? country.country_name : "Unknown Country"}</td>
                <td className="border-2 border-gray-300 px-4 py-2">{statelist.state_name}</td>
                <td className="border-2 border-gray-300 px-4 py-2">
                  <button className="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" onClick={() =>(editState(statelist))}  >
                    <i className="fas fa-edit"></i></button></td>
                <td className="border-2 border-gray-300 px-4 py-2">
                  <button className="text-white bg-red-500 w-full py-2 text-lg rounded hover:bg-red-700" onClick={() => {dispatch(deleteState(statelist.id))}} >
                    <i className="fas fa-trash-alt"></i></button></td>
          </tr>
          );
        })
      ), [states,countries,dispatch,editState]);
    
    
    
        return (
            <>
    <div className="flex-auto mr-2 text-center">
      <h2 className="text-blue-800 text-center text-3xl mb-4">State List</h2>
      {error && <p className='text-red-500 text-lg bg-gray-300'>{error}</p>}
      <table className="table-auto border-2 border-blue-800 border-separate bg-gray-100 w-full" id="state_list">
        <thead>
          <tr className='bg-gray-300'>
          <th colSpan={5} className="border-2 border-blue-800">
            <div className="flex items-center mb-2">
              <label className="flex-auto text-lg mr-2 text-right font-semibold" htmlFor="search">Search :</label>
              <div className="flex-1">
        <input type="text" id='search' placeholder="Search" value={search}  onChange={handleSearch} className="border-2 border-gray-300 p-2 rounded w-full" />
      </div>
      </div></th>
          </tr>
      <tr className='bg-gray-300'>
          <th className="border-2 border-blue-800 px-4 py-2">ID</th>
          <th className="border-2 border-blue-800 px-4 py-2">Country</th>
          <th className="border-2 border-blue-800 px-4 py-2">State</th>
          <th className="border-2 border-blue-800 px-4 py-2">Edit</th>
          <th className="border-2 border-blue-800 px-4 py-2">Delete</th>
        </tr>
        </thead>
        <tbody>
        { display }
        </tbody>
      </table>
      
    </div>
    </>
        )
}

export default StateTable;