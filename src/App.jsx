
import './app.css'


import ItemListContainer from './components/itemlistcontainer/ItemListContainer';
import ItemDetailContainer from './components/itemdetailcontainer/ItemDetailContainer';
import NoPage from './components/nopage/NoPage';
import Navbar from './components/navbar/Navbar';
import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Checkout } from "./components/checkout/Checkout";
import { Provider } from "./context/ItemsContext";

import {getFirestore,getDocs,collection,query,where,doc,
  /*   addDoc,
  doc,
  updateDoc, */
} from "firebase/firestore";




function App() {

    useEffect(() => {
    const db = getFirestore();

    const q = query(
      collection(db, "items"),
      where("category", "==", "bautismo")
    );

    getDocs(q).then((snapshot) => {
      if (snapshot.size === 0);
      else
        snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
    });
  });




  return (
    <>
    <Provider>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar/>}>
            <Route index element={<ItemListContainer/>} />
            <Route path='/categoria/:categoryid' element={<ItemListContainer/>} />
            <Route path='/detail/:idProduct' element={<ItemDetailContainer/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path='*' element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </Provider>

      


    </>
  )
}

export default App


