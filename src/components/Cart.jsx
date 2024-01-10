import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from '../store/CartContext';
import { currencyFortmatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
    const { items, addItem, removeItem } = useContext(CartContext);

    const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

    const cartTotal = items.reduce((totalPrice, item) => {
        return totalPrice + item.price * item.quantity;
    }, 0);

    function handleHideCart() {
        hideCart();
    }

    function handleShowCheckout() {
        showCheckout();
    }

    return (
        <Modal
            className="cart"
            open={progress === 'cart'}
            onClose={progress === 'cart' ? handleHideCart : null}
        >
            <h2>Your cart</h2>
            <ul>
                {items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        price={item.price}
                        onIncrease={() => addItem(item)}
                        onDecrease={() => removeItem(item.id)}
                    />
                ))}
            </ul>
            <p className="cart-total">{currencyFortmatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <button textOnly onClick={handleHideCart}>Close</button>
                {items.length > 0 && <button onClick={handleShowCheckout}>Go to Checkout</button>}
            </p>
        </Modal>
    );
}