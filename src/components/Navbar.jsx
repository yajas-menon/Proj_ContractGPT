import React from 'react';
import Logo from '../assets/Screenshot 2024-05-12 225359.png'

const Navbar = () => (
  <nav className="bg-white border-gray-200 shadow-md">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="mx-10 self-center text-2xl font-semibold whitespace-nowrap dark:text-black">ContractGPT</span>
      </a>
      <div className="flex items-center space-x-4">
        <a href="/ContractDashboard" className="text-lg font-medium text-gray-800 hover:text-gray-900">Dashboard</a>
        <a href='/Adhoc' className='text-lg font-medium text-gray-800 hover:text-gray-900'>Ad-Hoc</a>
        <a href="/fileView" className="text-lg font-medium text-gray-800 hover:text-gray-900">Creation</a>
        <a href="/AiReview" className="text-lg font-medium text-gray-800 hover:text-gray-900">Review</a>
        <a href="/negotiation" className="text-lg font-medium text-gray-800 hover:text-gray-900">Negotiation</a>
        <a href="/" className="text-lg font-medium text-gray-800 hover:text-gray-900">Logout</a>
        {/* Add more links here if needed */}
        
            <img src={Logo} alt='logo' className='h-12 ml-16'/> 
        
      </div>
    </div>
  </nav>
);

export default Navbar;
