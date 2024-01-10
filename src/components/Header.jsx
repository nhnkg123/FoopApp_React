import logo from '../../public/logo.jpg'
import Button from './UI/Button';
import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
    const { items } = useContext(CartContext);

    const { showCart } = useContext(UserProgressContext);

    const totalCartItems = items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="" />
                <h1>ReactFood</h1>
            </div>
            <nav>
                <Button
                    textOnly
                    onClick={handleShowCart}
                >Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}