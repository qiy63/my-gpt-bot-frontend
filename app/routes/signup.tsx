import * as React from "react";
import { useNavigate } from "react-router";
import "../styles/auth.css";

export default function Signup() {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const register = async () => {

        setMsg("");

        if (!name || !email || !password) {
            setMsg("Please fill all fields.");
            return;
        }

        setLoading(true);

        try {

            const res = await fetch("http://localhost:3000/auth/register", {

                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, email, password})

            });

            const data = await res.json();
            setLoading(false);

            if (data.message) {

                setMsg("Registered! Please login.");
                navigate("/login");

            } else {

                setMsg(data.error || "Registration Failed");

            }

        } catch (err) {

            setLoading(false);
            setMsg("Network Error");

        }

    };

    return (
    <div className="auth-page">

        <div className="floating-orb" style={{ width: 280, height: 280, top: 80, left: 60, background: "rgba(170,140,255,0.35)" }}></div>

        <div className="floating-orb" style={{ width: 240, height: 240, bottom: 60, right: 120, background: "rgba(190,160,255,0.28)" }}></div>

      <div className="auth-container">
        <div className="auth-left">
          <div className="logo">
            <div className="dot" />
            <h3>MyPropertyAid</h3>
          </div>

          <h1>Create your account</h1>
          <p>Join us and begin building smarter legal answers for Malaysian real estate.</p>
        </div>

        <div className="auth-right">
          <h2>Create account</h2>
          <div className="sub">Sign up to continue</div>

          <div className="form">
            <div className="input">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            </div>

            <div className="input">
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" type="email" />
            </div>

            <div className="input">
              <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
            </div>

            <button className="btn" onClick={register} disabled={loading}>
              {loading ? "Creating..." : "Create account"}
            </button>

            <div className="alt">
              <span style={{ display: "inline-block", marginRight: 8 }}>{msg}</span>
              <div style={{ marginTop: 8 }}>
                Already a member?{" "}
                <a href="/login" style={{ color: "white", textDecoration: "underline" }}>
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    );

}