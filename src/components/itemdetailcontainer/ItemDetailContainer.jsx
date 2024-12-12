import { useState, useEffect } from "react"

import Item from "../itemcat/Item.jsx"
import { useParams } from "react-router-dom"
import { getFirestore, doc, getDoc } from "firebase/firestore";




const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const { idProduct } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const db = getFirestore();
      const productRef = doc(db, "items", idProduct);
      try {
        const docSnap = await getDoc(productRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    fetchProduct();
  }, [idProduct]);

  return (
    <div className="item-list">
      {product ? (
        <Item key={product.id} product={product} />
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default ItemDetailContainer;
