import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext);
    return (
        <div>
            {!auth ? 
            <Link to={'/login'} className="absolute right-24 top-8 font-poppins">Login</Link>
            : <h1 className="absolute right-24 top-8 font-poppins">Logout</h1> }
            <h1 className=" font-poppins font-bold text-6xl border-black
                         border-b-4 pb-3 pt-3 text-center tracking-widest ">BLOG</h1>
        </div>
    )
}

export default Header;