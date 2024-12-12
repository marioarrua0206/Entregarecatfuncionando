import './itemlistcontainer.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../itemlist/ItemList'
import {
    getFirestore,
    getDocs,
    collection,
    where,
    query,
  } from "firebase/firestore";



  const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const { id } = useParams();
  
    useEffect(() => {
      const fetchItems = async () => {
        const db = getFirestore();
        const refCollection = !id
          ? collection(db, "items")
          : query(collection(db, "items"), where("categoria", "==", id));
  
        const snapshot = await getDocs(refCollection);
        setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      };
  
      fetchItems();
    }, [id]);
  
    return <>{loading ? <h5>Loading...</h5> : <ItemList products={items} />}</>;
  };
  
  export default ItemListContainer;