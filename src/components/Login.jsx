import { useState } from "react"

const Login = () => {
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
            }

        } catch(err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form>
                <input type="text" name="username" onChange={handleChange}></input>
                <input type="password" name="password" onChange={handleChange}></input>
                <button onClick={handleLogin} >Submit</button>
            </form>
        </div>
    )
}

export default Login