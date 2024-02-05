import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

const Homepage = () => {
   const token =localStorage.getItem("token")
   const [posts, setPosts] = useState([]);

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
   }, [])

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
         
            default:
               break;
         }
      } catch(err) {
         console.log(err)
      } 
   }

    return (
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
   }

export default Homepage