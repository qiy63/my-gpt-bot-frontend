import * as React from "react";
import { useNavigate } from "react-router";

export default function Signup() {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const navigate = useNavigate();

    const register = async () => {

        const res = await fetch("http://localhost:3000/auth/register", {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, password})

        });

        const data = await res.json();
        setMsg(data.message || data.error);

        if (data.message) {

            setMsg("Registered! Please login.");
            navigate("/login");

        }

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