import "./item.css"
import { useContext } from "react";
import { ItemsContext } from "../../context/ItemsContext";
import { Link } from "react-router-dom";
import { ItemCount } from '../itemcount/ ItemCount';
import Swal from 'sweetalert2';




const Item = ({ product }) => {
  const { addItem } = useContext(ItemsContext);

  const onAdd = (count) => {
    if (count > product.stock) {
      Swal.fire("No hay suficiente stock!");
      return;
    }
    Swal.fire("Guardado en el carrito!");
    addItem({ ...product, quantity: count });
    product.stock -= count;
  };


  return (
    <div key={product.id} className="card">
      <div className="image-box-card">
        <img className="image-card" src={product.imagen} alt={product.nombre} />
      </div>
      <div className="info-card">
        <h2 className="title-card">{product.nombre}</h2>
        <h4>{product.descripcion} </h4> 
        <h3>Precio: {product.precio} </h3>
        <h5>Cantidad en stock:  {product.stock} </h5>       
        <ItemCount stock={product.stock} onAdd={onAdd}/>
        
      </div>
    </div>
  );
};
export default Item;