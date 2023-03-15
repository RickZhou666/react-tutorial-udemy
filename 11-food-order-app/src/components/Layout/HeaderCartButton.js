import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
  const cartCtx = useContext(CartContext)

  const { items } = cartCtx

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)

  // use object desturcturing to pull out items

  // add animation class
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`

  useEffect(() => {
    // 1. change button class to include animation bump class
    if (items.length === 0) {
      return
    }
    setBtnIsHighlighted(true)

    // 2. then set a timer to remove the bump class again
    // 3. so when it's added again in the future it will play
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false) // this make sure the animation to be removed
    }, 100) // as this is the length of bump animation 300ms

    // 4. if we add multiple items rapidly we need this cleanup function
    return () => {
      clearTimeout(timer)
    }
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
