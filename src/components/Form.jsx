import { useState, useContext } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";

const Form = () => {
   const token =localStorage.getItem("token")

   const [posted, setPosted] = useState(false);
   const [admin, setAdmin] = useState(true);
   const [errors, setErrors] = useState();

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
            case 200: {
               setPosted(true);
               setErrors()}
               break;
// If form not filled out correctly        
            case 400: setErrors(await result.errors)
               break;
// If no token or it expired
            case 404: {
               setErrors();
               localStorage.clear();
               setAuth(false);
            }
               break;
// If not admin
            case 403: {
               setAdmin(false);
               setErrors();}
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
    : posted ?
    <div>
   <h1>Blog post added!</h1> 
   <Link to={"/"}>Back to homepage</Link>
    </div>
    : !admin ?
   <h1>You don't have the required permissions for this</h1>
    : 
   <h1>Your session has expired, please log back in</h1>}

   {errors ? 
   <ul> Fix the following errors before submitting:
      {errors.map((error, index) => (
      <li key={index}>{error.msg}</li>) )}
   </ul> :
   ""}
      
    </div>
 )
}

export default Form