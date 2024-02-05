import { Link } from "react-router-dom"

const Homepage = () => {
    return (
       <div>
         <Link to={"/edit"}>
          <button className="border-black border-2 font-poppins text-2xl
           mt-5  p-2 ml-20">New article</button>
         </Link>
       </div>
    )
   }

export default Homepage