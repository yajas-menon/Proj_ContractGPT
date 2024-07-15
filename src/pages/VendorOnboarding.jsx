import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { toast } from 'react-toastify';
import vendorimage1 from '../images/vendorimage1.png'

const VendorOnboarding = () => {
  const [formData, setFormData] = useState({
    vendorName: '',
    email: '',
    companyName: '',
    industry: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/auth/vendors', formData);

      if (response.status === 201) {
        toast.success("Vendor Onboarded Successfully")
        setFormData({
          vendorName: '',
          email: '',
          companyName: '',
          industry: ''
        });
      } else {
        toast.error("Failed to creater vendor")
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error registering vendor')
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex mt-2">
        <img src={vendorimage1} alt='vendor image' className="w-1/2 h-1/2 object-cover" />

        <div className="min-h-screen w-1/2 flex items-center justify-center bg-white">
          <div className="bg-white border border-slate-800 p-8 rounded-lg shadow-lg w-3/4 max-w-2xl">
            <h2 className="text-4xl font-bold text-center text-zinc-900">Vendor Onboarding</h2>
            <p className="text-center text-zinc-600 mb-6 mt-2">
              Welcome to our Vendor Intelligence Platform, an AI-powered contract management system designed to streamline your contract management process. Fill out the form below to get started.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="mb-4">
                  <label htmlFor="vendorName" className="block text-zinc-700">Vendor Name</label>
                  <input
                    type="text"
                    id="vendorName"
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.vendorName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-zinc-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="company-name" className="block text-zinc-700">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    placeholder="Enter your company name"
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="industry" className="block text-zinc-700">Industry</label>
                  <select
                    id="industry"
                    className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.industry}
                    onChange={handleChange}
                  >
                    <option value="">Select an industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="w-44 bg-black text-white text-primary-foreground py-2 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )

}

export default VendorOnboarding
