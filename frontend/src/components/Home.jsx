import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const token = sessionStorage.getItem("token");
    const [username, setUsername] = useState("Guest@123");
    const [email, setEmail] = useState("Guest@gmail.com");
    const [name, setName] = useState('guest');
    const navigate = useNavigate();

    const handleLogout = () => {
        if (sessionStorage.getItem) {
            sessionStorage.removeItem("token");
            alert("You have been logged out.");
        }
        navigate('/');
    }

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            try {
                const decodedData = jwtDecode(token);
                setUsername(decodedData.userName || "Guest");
                setEmail(decodedData.email || "guest123@gmail.com");
                setName(decodedData.userName.split("@")[0]);
            } catch (error) {
                console.log("Error decoding token:", error);
                navigate('/');
            }
        }
    }, [token, navigate]);

    return (
        <div className="flex flex-col justify-evenly items-center h-screen bg-sky-100">
            <p className="text-3xl font-bold text-center bg-gray-100 p-4 rounded-xl"> Namaste <span className="text-sky-800">{name}</span>🙏 </p>
            <div className="p-5">
                <p className="font-bold text-xl text-gray-800"> username - <span className="text-sky-800 font-bold text-xl lowercase"> {username} </span></p>
                <p className="font-bold text-xl text-gray-800"> email - <span className="text-sky-800 font-bold text-xl lowercase"> {email} </span></p>
            </div>
            <div onClick={handleLogout} className="text-red-600 text-lg underline font-bold cursor-pointer mt-5 "> Log Out </div>
        </div>
    )
}

export default Home