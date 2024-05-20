import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import the Navbar component
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [mode, setMode] = useState("login");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      const role = response.data.user.role;
      toast.success("Login successful");
      if (role == "reviewer") {
        navigate("/AiReview");
      } else if (role == "creater") {
        navigate("/PowerBiReport");
      }
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8000/api/auth/register", {
        username: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      setMode("login"); // Switch to login mode after successful registration
      toast.success("Registration successful. Please login.");
    } catch (error) {
      toast.error("Error during registration. Please try again.");
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-cover bg-center">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex">
            <div className="relative w-full md:w-1/2 p-8">
              {mode === "login" ? (
                <>
                  <h2 className="text-2xl font-semibold text-zinc-700 text-center">
                    Welcome back
                  </h2>
                  <p className="text-xl text-zinc-600 text-center mt-2">
                    Sign in to your account to manage your contract documents.
                  </p>
                  <div className="mt-8">
                    <div className="flex flex-col mb-4">
                      <label
                        className="mb-2 font-bold text-lg text-zinc-900"
                        htmlFor="email"
                      >
                        Email
                      </label>
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
                      <label
                        className="mb-2 font-bold text-lg text-zinc-900"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="bg-zinc-100 border border-zinc-300 text-zinc-900 rounded-lg focus:outline-none focus:border-blue-500 p-3"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      className="block w-full bg-zinc-800 hover:bg-zinc-900 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                    <p className="mt-4 text-center">
                      Don't have an account?{" "}
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => setMode("register")}
                      >
                        Sign up
                      </button>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-zinc-700 text-center">
                    Create an Account
                  </h2>
                  <p className="text-xl text-zinc-600 text-center mt-2">
                    Sign up to manage your contract documents.
                  </p>
                  <div className="mt-8">
                    <div className="flex flex-col mb-4">
                      <label
                        className="mb-2 font-bold text-lg text-zinc-900"
                        htmlFor="email"
                      >
                        Username
                      </label>
                      <input
                        className="bg-zinc-100 border border-zinc-300 text-zinc-900 rounded-lg focus:outline-none focus:border-blue-500 p-3"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col mb-4">
                      <label
                        className="mb-2 font-bold text-lg text-zinc-900"
                        htmlFor="email"
                      >
                        Email
                      </label>
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
                    <div className="flex flex-col mb-4">
                      <label
                        className="mb-2 font-bold text-lg text-zinc-900"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="bg-zinc-100 border border-zinc-300 text-zinc-900 rounded-lg focus:outline-none focus:border-blue-500 p-3"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col mb-6">
                      <label
                        className="mb-2 font-bold text-lg text-zinc-900"
                        htmlFor="confirmPassword"
                      >
                        Role:
                      </label>
                      <input
                        className="bg-zinc-100 border border-zinc-300 text-zinc-900 rounded-lg focus:outline-none focus:border-blue-500 p-3"
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="creater or reviewer"
                      />
                    </div>
                    <button
                      className="block w-full bg-zinc-800 hover:bg-zinc-900 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                      onClick={handleRegister}
                    >
                      Sign Up
                    </button>
                    <p className="mt-4 text-center">
                      Already have an account?{" "}
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => setMode("login")}
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="bg-white w-full md:w-1/2 p-8 text-black">
              <h2 className="text-2xl font-semibold">ContractFlow App</h2>
              <p className="mt-2 text-black">
                Our AI-powered contract management system helps you stay
                organized and on top of your contract obligations. Easily
                manage, track, and collaborate on all your contracts in one
                secure platform.
              </p>
              <ul className="mt-4 space-y-2">
                <li>🗂 Automated contract lifecycle management</li>
                <li>🧠 Intelligent contract analysis and insights</li>
                <li>🤖 AI-based Contract Review</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
