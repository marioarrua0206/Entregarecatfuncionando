
import "./itemdetail.css"

const ItemDetail = ({ product }) => {


  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="itemdetail">      
        <img src={product.imagen} alt={product.nombre} />
        <h1>{product.nombre}</h1>
        <p>{product.descripcion}</p>
        <h2>$ {product.precio}</h2>      
    </div>
  )
}
export default ItemDetail