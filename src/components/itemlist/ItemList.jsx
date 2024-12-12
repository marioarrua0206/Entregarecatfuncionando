
import { Link } from "react-router-dom";

function ItemList({products}) {
    return (
        <div className="item-list">
            {
                products.map((product) => {
                    return (
                        <Link to={`/detail/${product.id}`} key={product.id} className="item">
                            <div className="item">
                                <img src={product.imagen} alt={product.nombre} />
                                <hr />
                                <h2>{product.nombre}</h2>
                                <hr />
                            </div>
                        </Link>
                    );
                })
            }
        </div>
    );
}

export default ItemList;