import { useState, useEffect } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Meals() {
    const {
        data: loadedMeals,
        isLoading,
        error
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p className="center">Fetching meal ...</p>
    }

    if (error) {
        return <Error title="Failed to fetch meal" message={error}/>
    }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <li key={meal.id}>
                    <MealItem 
                        meal={meal}
                    />
                </li>
            ))}
        </ul>
    );
}