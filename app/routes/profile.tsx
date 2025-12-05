import * as React from "react";
import { useNavigate } from "react-router";
import "../styles/auth.css";

type Profile = {

    user_id?: number;
    email?: string;
    full_name?: string;
    phone?: string;
    gender?: string;
    birthdate?: string;
    address?: string;
    occupation?: string;
    national_id?: string;
    profile_picture?: string;

};

export default function ProfilePage() {

    const navigate = useNavigate();
    const [profile, setProfile] = React.useState<Profile | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [saving, setSaving] = React.useState(false);
    const [pictureFile, setPictureFile] = React.useState<File | null>(null);

    React.useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) { navigate("/login"); return; }

        (async () => {

            try {

                const res = await fetch("http://localhost:3000/api/profile", {

                    headers: { Authorization: `Bearer ${token}` }

                });

                const data = await res.json();

                setProfile(data.profile || {});

            } catch (err) {

                console.error(err);

            } finally { setLoading(false); }

        })();

    }, [navigate]);

    const handleSave = async () => {

        if (!profile) return;
        const token = localStorage.getItem("token");
        setSaving(true);

        try {

            if (pictureFile) {

                const form = new FormData();
                form.append("picture", pictureFile);

                const up = await fetch("http://localhost:3000/api/profile/upload", {

                    method: "POST",
                    headers: { Authorization: `Bearer ${token}`},
                    body: form

                });

                const upData = await up.json();
                profile.profile_picture = upData.filePath.replace("/profile/upload/", "");

            }

            const res = await fetch("http://localhost:3000/api/profile", {

                method: "PUT",
                headers: {

                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`

                },
                body: JSON.stringify(profile)

            });

            const data = await res.json();

            alert(data.message || "Saved");

        } catch (err) {

            console.error(err);
            alert("Save Failed");

        } finally {

            setSaving(false);

        }

    };

    if (loading) return <div style={{padding: 20}}>Loading...</div>

    return (
        <div className="auth-page">
        <div className="auth-container" style={{ gridTemplateColumns: "1fr 560px" }}>
            <div className="auth-left">
            <div className="logo"><div className="dot" /><h3>Galileo</h3></div>
            <h1>Account Profile</h1>
            <p>Manage your personal details. These are used for account verification and legal documents.</p>
            </div>

            <div className="auth-right">
            <h2>Your Profile</h2>
            <div className="sub">Update your details</div>

            <div className="form">
                <input value={profile?.full_name || ""} placeholder="Full name"
                    onChange={(e)=>setProfile({...profile, full_name: e.target.value})} />
                <input value={profile?.phone || ""} placeholder="Phone"
                    onChange={(e)=>setProfile({...profile, phone: e.target.value})} />
                <select value={profile?.gender || "other"} onChange={(e)=>setProfile({...profile, gender: e.target.value})}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
                <input type="date" value={profile?.birthdate ? profile.birthdate.split("T")[0] : ""} 
                    onChange={(e)=>setProfile({...profile, birthdate: e.target.value})} />
                <input value={profile?.occupation || ""} placeholder="Occupation"
                    onChange={(e)=>setProfile({...profile, occupation: e.target.value})} />
                <input value={profile?.national_id || ""} placeholder="National ID / IC"
                    onChange={(e)=>setProfile({...profile, national_id: e.target.value})} />
                <textarea value={profile?.address || ""} placeholder="Address" rows={3}
                        onChange={(e)=>setProfile({...profile, address: e.target.value})} />

                <div>
                <div style={{marginBottom:8}}>Profile picture</div>
                {profile?.profile_picture && (
                    <img src={`http://localhost:3000/upload/${profile.profile_picture}`} alt="profile" style={{width:84,height:84,objectFit:"cover",borderRadius:8,display:"block",marginBottom:8}} />
                )}
                <input type="file" accept="image/*" onChange={(e)=>setPictureFile(e.target.files?.[0] || null)} />
                </div>

                <button className="btn" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save profile"}
                </button>
            </div>
            </div>
        </div>
        </div>
    );

}