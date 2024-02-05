import { useState, useContext } from "react";
import { AuthContext } from "../App";

const Form = () => {
   const token =localStorage.getItem("token")

   const [posted, setPosted] = useState(false);
   const [admin, setAdmin] = useState(true);
   const [errors, setErrors] = useState([]);

   const { auth, setAuth } = useContext(AuthContext);

   async function handleSubmit (e) {
      e.preventDefault();
      const form = e.target;
      const values = {
         title: form.title.value,
         text: form.text.value,
         date: form.date.value,
         visible: form.visible.checked,
      }
      try {
         const response =await fetch("https://blog-serverapirest.fly.dev/api/posts", {
            method: "POST",
            headers: {
               'Content-Type' : 'application/json',
               'Authorization' : `Bearer ${token}`
           },
           body: JSON.stringify(values)
         });
         const status = response.status
         const result = await response.json()
 // Handle response based on JSON status
         switch (status) {
            case 200: setPosted(true);
               break;
// If form not filled out correctly        
            case 400: setErrors(await result.errors)
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
         }
      } catch(err) {
         console.error(err);
      }

   }
 return (
    <div>
      {!posted && admin && auth ? 
      <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" id="title"></input>
      <label htmlFor="text">Post content:</label>
      <textarea name="text" id="text"></textarea>
      <label htmlFor="date">Date:</label>
      <input type="date" name="date" id="date"></input>
      <label htmlFor="visible">Post visible?</label>
      <input type="checkbox" name="visible"></input>
      <input type="submit" value="Submit"></input>
   </form> 
    : ""}
      
    </div>
 )
}

export default Form