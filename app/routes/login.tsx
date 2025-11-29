import * as React from "react";

export default function Login() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [msg, setMsg] = React.useState("");

    const login = async () => {

        const res = await fetch("http://localhost:3000/auth/login", {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})

        });

        const data = await res.json();
        setMsg(data.message || data.error);

        if (data.token){

            localStorage.setItem("token", data.token);

        }

    };

    return (

        <div style={{ padding: 20 }}>

            <h1>Login</h1>

            <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br/>
            <input placeholder="Name" onChange={e => setPassword(e.target.value)} /><br/>

            <button onClick={login}>Login</button>
            <p>{msg}</p>

        </div>

    );

}