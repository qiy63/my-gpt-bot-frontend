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
                profile.profile_picture = upData.filePath;

            }

            const res = await fetch("http://")

        } catch {}

    }

}