import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext);

    useEffect(() => {
        if(localStorage.getItem("token")) {
            setAuth(true)}
    },[setAuth])

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        setAuth(false);
    }
    return (
        <div>
            {!auth ? 
            <Link to={'/login'} className="absolute right-24 top-8 font-poppins">Login</Link>
            : <button className="absolute right-24 top-8 font-poppins" onClick={handleLogout}>
                Logout</button> }
            <h1 className=" font-poppins font-bold text-6xl border-black
                         border-b-4 pb-3 pt-3 text-center tracking-widest ">BLOG</h1>
        </div>
    )
}

export default Header;