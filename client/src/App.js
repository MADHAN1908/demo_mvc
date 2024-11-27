import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import React  from "react";
import Layout from "./Layout";
import { Provider } from "react-redux";
import { store } from "./store/store";
import User from './page/User';
import Country  from './page/Country';
import State from './page/State';

function App() {


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<User />} />
      <Route path="/state" element={<State />} />
      <Route path="/country" element={<Country />} />
    </Route>
  )
)

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    
 ); 
}

export default App;
