import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from '../store/CartContext';
import { currencyFortmatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    }
};

export default function Checkout() {
    const { items, clearCart } = useContext(CartContext);

    const { progress, hideCheckout } = useContext(UserProgressContext);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = items.reduce((totalPrice, item) => {
        return totalPrice + item.price * item.quantity;
    }, 0);

    function handleCloseCheckout() {
        hideCheckout();
    }

    function handleFinish() {
        hideCheckout();
        clearCart();
        clearData();
    }

    function handleSubmitForm(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: items,
                customer: customerData,
            }
        }));
    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleCloseCheckout}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>
    }

    if (data && !error) {
        return <Modal
            open={progress === 'checkout'}
            onClose={handleFinish}
        >
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you with more details via email whithin the next few minutes.</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Close</Button>
            </p>
        </Modal>
    }

    return (
        <Modal open={progress === 'checkout'} onClose={handleCloseCheckout}>
            <form onSubmit={handleSubmitForm}>
                <h2>Checkout</h2>
                <p>Total amount: {currencyFortmatter.format(cartTotal)}</p>

                <Input label="Full name" type="text" id="name"/>
                <Input label="E-mail address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && <Error title="Failed to submit order" message={error}/>}
                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
}