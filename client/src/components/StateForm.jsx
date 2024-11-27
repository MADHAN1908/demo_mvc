import React,{useCallback } from 'react';
import { useDispatch } from "react-redux";
import { addState,updateState } from "../store/redux/stateSlice";

const StateForm =  ({ countries,state, setstate, submit, setSubmit }) => {

  const dispatch = useDispatch();

      const getValue = useCallback((event) => {
        const {name, value } = event.target;
        setstate((prev) => ({...prev, [name]: value }));
      },[]);
    
      const validateForm = () => {
        if (!state.country_id) {
          alert("Country Name must be  chosen");
          return false;
        }else if (!state.state_name) {
          alert("State Name is must be filled up ");
          return false;
        }else{
          return true;
        }
      };
    
      const editState = useCallback((statelist) => {
        setstate({
          id : statelist.id,
          country_id : statelist.country_id,
          state_name : statelist.state_name
        });
        setSubmit(true);
      },[setstate,setSubmit]);

      const submitForm = useCallback((event) => {
        event.preventDefault();
        if (validateForm()) {
          if(submit){
            dispatch(updateState(state));
          }else{
            dispatch(addState(state));
          }
          setSubmit(false);
          setstate({id :"", country_id:"",state_name:""});
        }
      });

        return (
            <>
                <div className="flex-1 " >
        <div className="bg-gray-100 border-4 border-blue-800 w-96 p-5 rounded-md flex flex-col h-auto max-h-[450px] m-5 md:max-w-[375px]">
        <h1 className="text-blue-800 text-center text-3xl mb-4">State</h1>
          <div className="flex items-center mb-2">
          <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="country"> Country   : </label>
          <div className="flex-2">
            <select name="country_id" id="country" value={state.country_id} onChange={getValue} className="w-full p-1 border border-gray-300 rounded" >
              <option value="">Select Country</option>
              {countries.map((countrylist,index) => (
                <option key={index} value={countrylist.id}>{countrylist.country_name}</option>)
              )}
             
            </select>
          </div>
          </div>
          <div className="flex items-center mb-2">
            <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="state"> State   : </label>
            <div className="flex-2">
              <input type="text" id="state" name="state_name" placeholder="State Name" className="w-full p-1 border border-gray-300 rounded" value={state.state_name} onChange={getValue} />
            </div>
            </div>
    
        <div id="btn" className="flex items-center mb-2">
        <button onClick={submitForm} className="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" value="Register" >{submit ? <>Update State </>: <>Add State</> }</button>
        </div>
      </div>
      </div>
    </>
        )
}

export default StateForm;