import CartContext from './cart-context'
import { useReducer } from 'react'
// 1. Manage Cart context data
// 2. provide that context that all components can use it

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount

      // check if item already existed to avioud duplicate item
      // if item exists, return the index
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      )
      const existingCartItem = state.items[existingCartItemIndex]

      let updatedItems

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        }
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
      } else {
        updatedItems = state.items.concat(action.item)
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }
    }

    case 'REMOVE': {
      // find the index of the item
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      )

      // get the existing item (return null if not existed)
      const existingItem = state.items[existingCartItemIndex]

      // decrease 1 per item price
      const updatedTotalAmount = state.totalAmount - existingItem.price

      let updatedItems

      // the previous item only has 1 amount, we will remove this object from the list
      if (existingItem.amount === 1) {
        // we will remove current item via id
        updatedItems = state.items.filter((item) => {
          return item.id !== action.id
        })
      } else {
        // we have more number of this item
        const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
        updatedItems = [...state.items]
        updatedItems[existingCartItemIndex] = updatedItem
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      }
    }
    default: {
      return defaultCartState
    }
  }
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const handleAddItemToCart = (item) => {
    dispatchCartAction({ type: 'ADD', item: item })
  }

  const handleRemoveItemToCart = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: handleAddItemToCart,
    removeItem: handleRemoveItemToCart,
  }
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
