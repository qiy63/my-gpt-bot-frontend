import * as React from "react";

export default function Signup() {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [msg, setMsg] = React.useState("");

    const register = async () => {

        const res = await fetch("http://localhost:3000/auth/register", {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, password})

        });

        const data = await res.json();
        setMsg(data.message || data.error);

    };

    return (

        <div style={{ padding: 20 }}>

            <h1>Signup</h1>

            <input placeholder="Name" onChange={e => setName(e.target.value)} /><br/>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br/>
            <input placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/>

            <button onClick={register}>Register</button>
            <p>{msg}</p>

        </div>

    );

}