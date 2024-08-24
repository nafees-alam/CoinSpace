import React, { createContext, useContext, useEffect, useState } from 'react'

const Currency = createContext();


const CurrencyContext = ({children}) => {
  const[currency, setCurrency] = useState("INR");
  const[symbol, SetSymbol] = useState("₹");

  useEffect(() => {
    if(currency === "INR") SetSymbol("₹")
    else if(currency === 'USD') SetSymbol('$')
  }, [currency]);
  return (
    <Currency.Provider value={{currency, setCurrency, symbol}}>
      {children}
    </Currency.Provider>
  )
}

export default CurrencyContext;

export const CurrencyState = () => {
  return useContext(Currency);
}