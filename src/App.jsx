import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { createContext, useState } from "react"

export const AuthContext = createContext({
  auth: false,
})

function App() {

  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Header />
      <Outlet />
    </AuthContext.Provider >
  )
}

export default App
