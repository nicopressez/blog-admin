import { useEffect, useContext, useState } from "react"
import { PropTypes } from "prop-types";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const Comments = ({postid, comments, setComments}) => {
    const [admin, setAdmin] = useState(true);
    const { auth, setAuth } = useContext(AuthContext)

    const navigate = useNavigate();
    const token =localStorage.getItem("token")

    const handleDelete = async (e, id) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://blog-serverapirest.fly.dev/api/posts/${postid}/comments/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                 }
            });
            const status = response.status;
            switch (status) {
                case 200: {
                   const updatedComments = comments.filter(comment => comment._id !== id)
                   setComments(updatedComments)
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
             }

        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://blog-serverapirest.fly.dev/api/posts/${postid}/comments`);
                setComments(await response.json())
            } catch(err) {
                console.log(err)
            }
            
        } 
        fetchData()
        if (!auth) navigate('/login')
    },[postid,setComments, navigate,auth,token])
 if (admin && auth)   return (
        <div className="mt-10">
            {comments.map((comment) => (
                <div className=" font-poppins border-gray-300 border-2 mb-4 w-1/2 ml-auto mr-auto text-center"key={comment._id}>
                <h3 className=" font-bold mt-1 text-lg">{comment.username ? comment.username : "Anonymous"}</h3>
                <h4 className=" italic text-sm mb-2">{comment && comment.date.slice(0,10)}</h4>
                <p className="mb-2">{comment.content}</p>
                <button onClick={e => handleDelete(e, comment._id)} className=" text-red-700 font-bold">
                     Delete</button>
                </div>
            ))}
        </div>
    )
 if (!admin) return (
    <h1>You dont have the permissions to see and delete comments</h1>
 )


}

Comments.propTypes = {
    postid: PropTypes.string,
    comments: PropTypes.array,
    setComments: PropTypes.func,
}

export default Comments