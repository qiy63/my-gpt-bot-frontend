import * as React from "react";
import { useNavigate } from "react-router";
import "../styles/auth.css";

export default function Login() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const navigate = useNavigate();

    const login = async () => {

        setMsg("");
        if (!email || !password) {

            setMsg("Please fill email and password");
            return;

        }

        setLoading(true);

        try {

            const res = await fetch("http://localhost:3000/auth/login", {

                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})

            });

            const data = await res.json();
            setLoading(false);

            if (data.token){

                localStorage.setItem("token", data.token);
                navigate("/chat");

            }else{

                setMsg(data.message || data.error || "Login Failed");

            }

        } catch (err) {

            setLoading(false);
            setMsg("Network error. ")

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

          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae ullam nobis pariatur, obcaecati fugit nostrum nisi voluptatum illum dicta labore?
          </p>
        </div>

        <div className="auth-right">
          <h2>Welcome back</h2>
          <div className="sub">Log in to continue</div>

          <div className="form">
            <div className="input">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                type="email"
                autoComplete="email"
              />
            </div>

            <div className="input">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
              />
              <button className="show-btn" onClick={() => setShow(!show)} type="button">
                {show ? "Hide" : "Show"}
              </button>
            </div>

            <button className="btn" onClick={login} disabled={loading}>
              {loading ? "Signing in..." : "Proceed to my Account"}
            </button>

            <div className="alt">
              <span style={{ display: "inline-block", marginRight: 8 }}>{msg}</span>
              <div style={{ marginTop: 8 }}>
                New here?{" "}
                <a href="/signup" style={{ color: "white", textDecoration: "underline" }}>
                  Create an account
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

}