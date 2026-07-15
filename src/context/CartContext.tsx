import { createContext, useContext, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  description?: string;
  price: string;
  image: string;
  quantity: number;
  note?: string;
  status?: string;
  proofImage?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  orderItems: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  checkoutCart: (note: string) => void;
  updateOrderStatus: (id: string, proofImage: string) => void;
  getTotalPrice: () => number;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const increaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const checkoutCart = (note: string) => {
    const orders = cartItems.map((item) => ({
      ...item,
      note,
      status: "Sedang Diproses",
      proofImage: undefined,
    }));

    setOrderItems(orders);
    setCartItems([]);
  };

  const updateOrderStatus = (id: string, proofImage: string) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Selesai",
              proofImage,
            }
          : item,
      ),
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/\D/g, ""));

      return total + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orderItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        checkoutCart,
        updateOrderStatus,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
