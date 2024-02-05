import { useEffect, useState, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { AuthContext } from "../App";

const Edit = () => {
    const [post, setPost] = useState();
    const [edited, setEdited] = useState(false);
    const [admin, setAdmin] = useState(true);
    const [errors, setErrors] = useState();

    const { auth, setAuth } = useContext(AuthContext)

    const {id} = useParams()

    const token = localStorage.getItem("token")

    useEffect (() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://blog-serverapirest.fly.dev/api/posts/${id}`)
                setPost(await response.json())
            } catch (err) {
                console.log(err)
            }
        }
        fetchPost()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
         const values = {
          title: form.title.value,
          text: form.text.value,
          date: form.date.value,
          visible: form.visible.checked,
          }
        try {
            const response = await fetch(`https://blog-serverapirest.fly.dev/api/posts/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(values)
            });
            const status = response.status
            const result = await response.json()
            switch (status) {
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

             default:  setEdited(true);
                break;
            }

        } catch(err) {
            console.log(err)
        }
    }
    if (post && !edited && auth && admin) return (
      <div>
        <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" id="title" defaultValue={post.title}></input>
      <label htmlFor="text">Post content:</label>
      <textarea name="text" id="text" defaultValue={post.text}></textarea>
      <label htmlFor="date">Date:</label>
      <input type="date" name="date" id="date" defaultValue={post.date.slice(0,10)}></input>
      <label htmlFor="visible">Post visible?</label>
      <input type="checkbox" name="visible" defaultChecked={post.visible}></input>
      <input type="submit" value="Submit"></input>
   </form> 

        {errors &&
            <ul> Fix the following errors before submitting:
               {errors.map((error, index) => (
               <li key={index}>{error.msg}</li>) )}
            </ul> 
        }
        </div>
    )

    if (edited) return  (
        <div>
        <h1>Post edited successfully</h1>
        <Link to={"/"}>Back to homepage</Link>
        </div>
    )
}

export default Edit