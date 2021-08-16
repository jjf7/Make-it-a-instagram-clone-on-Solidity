import React, { useState, useEffect } from 'react'
import Main from "./Main"

export default function App() {
const [isLoader, setIsLoader] = useState(false);
  
  return (
    <>
      { !isLoader ? <Main /> : (<h1>Loading...</h1>)   }
    </>
  )
}
