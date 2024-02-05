import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext({
  auth: false,
})

function App() {

  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem("token")) {
        setAuth(true)}
    setIsLoading(false);
},[setAuth])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Header />
      {!isLoading && <Outlet />}
    </AuthContext.Provider >
  )
}

export default App
