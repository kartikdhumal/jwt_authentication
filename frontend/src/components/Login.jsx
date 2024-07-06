import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [userData, setUserData] = useState({
        userName: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (userData.userName == "" || userData.password == "") {
            alert("All are fields are required");
            return false;
        }

        if (!/^[a-zA-Z0-9@_/-]{2,}$/.test(userData.userName)) {
            alert("Username must be alphanumeric and at least 2 characters long.");
            return false;
        }

        if (userData.password.length < 2) {
            setError("Password must be at least 2 characters long.");
            return false;
        }
        await axios.post(`${import.meta.env.VITE_URL}/login`, userData).then((response) => {
            alert("Login Successfull");
            sessionStorage.setItem("token", response.data.token);
            setUserData({
                userName: "",
                password: ""
            })
            navigate('/home');
        }).catch((err) => {
            if (err.response) {
                alert(err.response.data.message);
            }
            setUserData({
                userName: "",
                password: ""
            })
        })

    }
    return (
        <div className="flex justify-center flex-col items-center w-full h-screen bg-blue-300">
            <form className="flex flex-col bg-blue-200 shadow-2xl p-5 md:w-1/2 lg:w-1/4 w-11/12 rounded-xl" onSubmit={handleLogin}>
                <p className="text-3xl font-bold mb-5 text-center"> Login </p>
                <input type="text" name="userName" value={userData.userName} onChange={handleChange} placeholder="Enter Username" className="p-2 rounded-lg mt-3 bg-gray-200 border-2 focus:outline-none focus:border-gray-400" />
                <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Enter Password" className="p-2 rounded-lg mt-3 bg-gray-200 border-2 focus:outline-none focus:border-gray-400" />
                <input type="submit" value="Login" className="w-full text-center cursor-pointer font-bold bg-blue-900 text-white mt-4 p-2 rounded-lg hover:bg-blue-800"></input>
                <div className="w-full text-left pt-2">
                    <Link to={'/register'} className="text-md text-gray-800 font-semibold hover:text-blue-900">No Account ? Register Here</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
