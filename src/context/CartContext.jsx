import React, { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = `${action.item.id}-${action.item.size}-${action.item.options?.join(',')}`;
      const existing = state.items.find(i => i.cartKey === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.cartKey === key ? { ...i, qty: i.qty + action.item.qty } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.item, cartKey: key }] };
    }
    case 'UPDATE_QTY':
      if (action.qty <= 0) {
        return { ...state, items: state.items.filter(i => i.cartKey !== action.cartKey) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.cartKey === action.cartKey ? { ...i, qty: action.qty } : i
        ),
      };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.cartKey !== action.cartKey) };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = useCallback((item) => dispatch({ type: 'ADD_ITEM', item }), []);
  const updateQty = useCallback((cartKey, qty) => dispatch({ type: 'UPDATE_QTY', cartKey, qty }), []);
  const removeItem = useCallback((cartKey) => dispatch({ type: 'REMOVE_ITEM', cartKey }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items: state.items, total, count, addItem, updateQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
