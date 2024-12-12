import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import '../navbar/navbar.css'
import { ItemsContext } from "../../context/ItemsContext";

export const CartWidget = () => {
    const {items} = useContext (ItemsContext)
    const totalItems =items.reduce ((acc, item) => acc + item.quantity, 0);
    return (
    <div className="cart">
        <Link to="/checkout">
       
        <MdOutlineShoppingCart className="cart" size="35px" />
        {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </Link>
        </div>
)
}

export default CartWidget