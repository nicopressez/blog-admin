import { useState } from "react"
import { AuthContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const { auth, setAuth } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({})
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })}

    async function handleLogin (e) {
        e.preventDefault()
        try {
            const response = await fetch('https://blog-serverapirest.fly.dev/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            const obj = await response.json()
            if (response.status === 200) {
                const token = obj.token
                localStorage.setItem('token', token)
                setAuth(true);
            }

        } catch(err) {
            console.log(err)
        }
    }
    return (
        <div>
            {!auth ?
            <div> 
            <h1>Login</h1>
            <form>
                <input type="text" name="username" onChange={handleChange}></input>
                <input type="password" name="password" onChange={handleChange}></input>
                <button onClick={handleLogin} >Submit</button>
            </form>
            </div>
            : 
            <div>
                <h1>You are now logged in</h1>
                <Link to={"/"}>Back to homepage</Link>
            </div>}
            
        </div>
    )
}

export default Login