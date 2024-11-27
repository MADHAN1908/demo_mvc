import React,{ useCallback } from 'react';
import { useDispatch } from "react-redux";
import { addUser,updateUser } from "../store/redux/userSlice";


const UserForm = ({ countries,states,user, setuser, country, setcountry, submit, setSubmit,setFormVisible }) =>  {

    const dispatch = useDispatch();
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg'];
    const maxFileSize = 2 * 1024 * 1024;
    const getValue = useCallback((event) => {
      const { name, value } = event.target;
      setuser((prev) => {
          const updatedUser = { ...prev, [name]: value };
  
          if (name === "country") {
              setcountry(value); 
          } else if (name === "expire_days") {
              const expireDays = parseInt(value, 10);
              if (!isNaN(expireDays)) {
                  const date = new Date();
                  date.setDate(date.getDate() + expireDays);
                  const formatDate = date.toISOString().split('T')[0];
                  updatedUser.expire_date = formatDate;
                  // console.log("Expire Date Updated:", formatDate);
              }
          }
  
          return updatedUser;
      });
  }, []);
    const getfile = useCallback((event) => {
      const image = event.target.files[0];
      setuser((prevuser) => ({...prevuser, photo : image }));
  
    },[]);
  
    const validateForm = () => {
      if (!user.name) {
        alert("Name must be  filled out");
        return false;
      }else if (!user.organization) {
        alert(" Organization Name is must be filled out ");
        return false;
      }else if (!user.mobile_no) {
        alert(" Mobile Number is must be filled out ");
        return false;
      }else if (user.mobile_no.length !== 10 ) {
        alert(" Mobile Number must be in 10 digits ");
        return false;
      }else if (!user.email) {
        alert(" Email is must be filled out ");
        return false;
      }else if (!user.password) {
        alert(" Password is must be filled out ");
        return false;
      }else if (user.password.length < 6) {
        alert(" Password should not be less than 6 character ");
        return false;
      }else if (!user.photo && !user.id) {
        alert(" Photo is must be chosen ");
        return false;
      }else if (allowedFileTypes.indexOf(user.photo.type) === -1 && user.photo) {
        alert("Photo must be in JPG, JPEG, SVG, or PNG format");
        return false;
      } else if (user.photo.size > maxFileSize && user.photo) {
        alert("Photo size must be less than 2 MB");
        return false;
      }else if (!user.no_of_users) {
        alert(" Number of users is must be filled out ");
        return false;
      }else if (!user.country) {
        alert(" Country is must be chosen ");
        return false;
      }else if (!user.state) {
        alert(" State is must be chosen ");
        return false;
      }else if (!user.expire_days) {
        alert(" Expire Days is must be filled out ");
        return false;
      }else{
        return true;
      }
    };
  
    const submitForm = useCallback((event) => {
      event.preventDefault();
      if (validateForm()) {
        const formData = new FormData();
          for (const key in user) {
          if (key === "photo" && user.photo instanceof File) {
            formData.append("photo", user.photo);
        } else {
            formData.append(key, user[key]);
        }
      }
        if(submit){
          dispatch(updateUser(formData));
        }else{
          
          dispatch(addUser(formData));
        }
        setSubmit(false);
        document.getElementById("file").value="";
        setFormVisible(false);
        setuser({
          id : "",
          name : "",
          organization : "",
          mobile_no : "",
          email : "",
          password : "",
          photo  : "",
          change_photo :"",
          no_of_users : "",
          country : "",
          state : "",
          expire_days : ""
        });
      }
    },[user,validateForm,dispatch]);

    
  
    return (
     
    <div id="register_form" className="flex justify-center items-center min-h-screen  " >
      <div className="bg-gray-100 border-4 border-blue-800 w-100 p-5 rounded-md flex flex-col h-auto max-h-[450px] m-5 md:max-w-[375px]">
        <h1 className="text-blue-800 text-center text-3xl mb-4">Registration Form</h1>
        <div className="flex items-center mb-2">
        <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="name">Name :</label>
        <div className="flex-2">
        <input type="text" id="name" name="name" placeholder="Full Name" className="w-full p-1 border border-gray-500 rounded" 
         value={user.name} onChange={getValue} />
        </div>
        </div>
    
        <div className="flex items-center mb-2">
          <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="organization">Organization :</label>
          <div className="flex-2">
          <input type="text" id="organization" name="organization" placeholder="Organization Name" className="w-full p-1 border border-gray-500 rounded" 
          value={user.organization} onChange={getValue} />
          </div>
          </div>
    
          <div className="flex items-center mb-2">
            <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="mobile_no">Mobile No : </label>
            <div className="flex-2">
            <input type="number" id="mobile_no" className="w-full p-1 border border-gray-500 rounded" name="mobile_no" placeholder="Mobile No" 
            value={user.mobile_no} onChange={getValue} />
            </div>
            </div>
    
        <div className="flex items-center mb-2">
        <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="email">E-mail : </label>
        <div className="flex-2">
        <input type="email" id="email" className="w-full p-1 border border-gray-500 rounded" name="email" placeholder="Email Address"
         value={user.email} onChange={getValue} />
        </div>
        </div>
        {/* <div id="email_message" style="display: none;">Format : abc123@gmail.com</div> */}
        
    
        <div className="flex items-center mb-2">
        <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="pass">Password  : </label>
        <div className="flex-2">
        <input type="password" id="pass" name="password" className="w-full p-1 border border-gray-500 rounded"
         value={user.password} onChange={getValue} />
        </div>
        </div>
        <div id="pass_message"></div>
  
        <div className="flex items-center mb-4">
          <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="file">Photo : </label>
          <div className="flex-2">
          <input type="file" id="file" name="photo" className="w-4/5 p-1 border border-gray-500 rounded" 
             onChange={getfile} />
          </div>
          </div>
    
        <div className="flex items-center mb-2">
          <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="users">Number of Users : </label>
          <div className="flex-2">
          <input type="number" id="users" className="w-full p-1 border border-gray-500 rounded" name="no_of_users" placeholder="No of users"
           value={user.no_of_users} onChange={getValue} />
          </div>
          </div>
    
          <div className="flex items-center mb-2">
          <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="country"> Country   : </label>
          <div className="flex-2">
            <select name="country" id="country" value={user.country} onChange={getValue} className="w-full p-1 border border-gray-500 rounded" >
            <option value="">Select Country</option>
            {countries.map((countrylist, index) => (
                <option key={index} value={countrylist.id}>{countrylist.country_name}</option>)
              )}
            </select>
          </div>
          </div>
          <div className="flex items-center mb-2">
            <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="state"> State   : </label>
            <div className="flex-2">
              <select name="state" id="state" value={user.state} onChange={getValue} className="w-full p-1 border border-gray-500 rounded" >
              <option value="">Select State</option>
              {country && states.filter((statelist) => country == statelist.country_id).map((statelist, index) => (
                <option key={index} value={statelist.id}>{statelist.state_name}</option>)
              )}
              </select>
            </div>
            </div>
    
            <div className="flex items-center mb-2">
              <label className="flex-1 text-lg mr-2 text-left font-semibold" htmlFor="expire_days">Expire Days : </label>
              <div className="flex-2">
              <input type="number" id="expire_days" className="w-full p-1 border border-gray-500 rounded" name="expire_days" placeholder="Expire Days" 
               value={user.expire_days} onChange={getValue} />
              </div>
              </div>
  
        <div id="btn" className="flex items-center mb-2">
        <button onClick={submitForm} className="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" value="Register" >{submit ? <>Update</> : <>Register</> }</button>
        </div>
      </div>
      </div>
   
   ); 
}

export default UserForm;