import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
   const token =localStorage.getItem("token")
   const [posts, setPosts] = useState([]);
   const [admin, setAdmin] = useState(true);
   const { auth, setAuth } = useContext(AuthContext)
   const navigate = useNavigate();

   useEffect(() => {
      async function getPosts () {
         try {
            const response = await fetch("https://blog-serverapirest.fly.dev/api/posts");
            const result = await response.json();
            setPosts(result);
         } catch(err) {
            console.log(err)
         }
      }
      getPosts()
      // If not logged in, redirect to login
      if (!auth) navigate('/login')
   }, [navigate,auth,token])

    async function handleDelete (e, id) {
      e.preventDefault();
      try {
         const response = await fetch(`https://blog-serverapirest.fly.dev/api/posts/${id}`, {
            method: "DELETE",
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
            }
         });
         const status = response.status;
         console.log(status)
         switch (status) {
            case 200: {
               const updatedPosts = posts.filter(post => post._id !== id)
               setPosts(updatedPosts);
            }              
               break;
            // If no token or it expired
            case 404: {
               localStorage.clear();
               setAuth(false);
            }
               break;
// If not admin
            case 403: setAdmin(false);
               break;
         
            default:
               break;
         }
      } catch(err) {
         console.log(err)
      } 
   }

    if (auth) return (
       <div>
   
         <Link to={"/edit"}>
          <button className="border-black border-2 font-poppins text-2xl
           mt-5  p-2 ml-20">New article</button>
         </Link>
            {posts.map((post) => (
                <div key={post._id} className=" border-2 w-1/2 text-center ml-auto mr-auto
                  font-poppins mb-5" >
                    <h2 className="font-bold text-xl">{post.title}</h2>
                    <h3>{post.date}</h3>
                    <button onClick={(e) => handleDelete(e,post._id)} className=" text-red-700 font-bold">
                     Delete</button>

                </div> ))}

       </div>
    )

    if (!admin) return (
      <h1>You require admin permissions in order to view and edit posts </h1>
    )
   }

export default Homepage