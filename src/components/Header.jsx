import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <Link to={'/login'} className="absolute right-24 top-8 font-poppins">Login</Link>
            <h1 className=" font-poppins font-bold text-6xl border-black
                         border-b-4 pb-3 pt-3 text-center tracking-widest ">BLOG</h1>
        </div>
    )
}

export default Header;