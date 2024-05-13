import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";  // Import the Navbar component

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleLogin = () => {
        // Dummy login logic
        if (formData.email === "reviewer@gmail.com" && formData.password === "1234") {
            navigate("/AiReview");
        } else if (formData.email === "creater@gmail.com" && formData.password === "4567") {
            navigate("/PowerBiReport");
        } else {
            // Handle incorrect login credentials
            alert("Invalid email or password");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-cover bg-center">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex">
                    <div className="w-full md:w-1/2 p-8">
                        <h2 className="text-2xl font-semibold text-zinc-700 text-center">Welcome back</h2>
                        <p className="text-xl text-zinc-600 text-center mt-2">Sign in to your account to manage your contract documents.</p>
                        <div className="mt-8">
                            <div className="flex flex-col mb-4">
                                <label className="mb-2 font-bold text-lg text-zinc-900" htmlFor="email">Email</label>
                                <input
                                    className="bg-zinc-100 border border-zinc-300 text-zinc-900 rounded-lg focus:outline-none focus:border-blue-500 p-3"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div className="flex flex-col mb-6">
                                <label className="mb-2 font-bold text-lg text-zinc-900" htmlFor="password">Password</label>
                                <input
                                    className="bg-zinc-100 border border-zinc-300 text-zinc-900 rounded-lg focus:outline-none focus:border-blue-500 p-3"
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {/* <a href="#" className="text-sm text-blue-500 hover:text-blue-700 float-right mt-2">Forgot password?</a> */}
                            </div>
                            <button
                                className="block w-full bg-zinc-800 hover:bg-zinc-900 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </div>
                    </div>

                    <div className="bg-white w-full md:w-1/2 p-8 text-black">
                        <h2 className="text-2xl font-semibold"> ContractFlow App</h2>
                        <p className="mt-2 text-black">Our AI-powered contract management system helps you stay organized and on top of your contract obligations. Easily manage, track, and collaborate on all your contracts in one secure platform.</p>
                        <ul className="mt-4 space-y-2">
                            <li>🗂 Automated contract lifecycle management</li>
                            <li>🧠 Intelligent contract analysis and insights</li>
                            <li>🤖 AI based Contract Review </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
