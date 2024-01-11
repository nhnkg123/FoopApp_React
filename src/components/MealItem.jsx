import { currencyFortmatter } from "../util/formatting";
import Button from "./UI/Button";
import { useContext } from "react";
import CartContext from "../store/CartContext";

export default function MealItem({ meal }) {
    const { 
        items,
        addItem,
    } = useContext(CartContext);

    function handleAddMealToCart() {
        addItem(meal);
    }

    return (
        <li className="meal-item">
            <article>
                <img src={`https://localhost:3000/${meal.image}`} alt={meal.name} />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFortmatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button
                        onClick={handleAddMealToCart}
                    >Add to Cart</Button>
                </p>
            </article>
        </li>
    );
}