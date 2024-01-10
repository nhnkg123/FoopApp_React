import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartcontextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartcontextProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </CartcontextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
