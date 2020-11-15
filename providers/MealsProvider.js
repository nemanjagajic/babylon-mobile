import React, { useState } from 'react'

export const MealsContext = React.createContext({})

const MealsProvider = ({ children }) => {
  const [order, setOrder] = useState([])

  return (
    <MealsContext.Provider value={{
      order,
      setOrder
    }}>
      {children}
    </MealsContext.Provider>
  )
}

export default MealsProvider