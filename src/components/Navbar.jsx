// components/Navbar.js
import React, { useEffect, useState } from 'react';
import Logo from '../images/Screenshot 2024-05-12 225359.png';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../images/user-icon.svg'


const Navbar = () => {
  const { isLoggedIn, userRole , logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const [showDropdown, setShowDropdown] = useState(false);

  return (

    <nav className="bg-white border-gray-200 shadow-md">
      <div className=" flex flex-wrap items-center justify-between p-4 mx-10">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="mx-10 self-center text-2xl font-semibold whitespace-nowrap dark:text-black">ContractFlow</span>
        </a>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <>
              {userRole === 'admin' && <a href="/ContractDashboard" className="text-lg font-medium text-gray-800 hover:text-gray-900">Dashboard</a>}
              <a href="/fileView" className="text-lg font-medium text-gray-800 hover:text-gray-900">Creation</a>
              <a href="/AiReview" className="text-lg font-medium text-gray-800 hover:text-gray-900">Review</a>
              <a href="/Adhoc" className="text-lg font-medium text-gray-800 hover:text-gray-900">Ad-Hoc</a>
              <a href="/execution" className="text-lg font-medium text-gray-800 hover:text-gray-900">Execution</a>
              
              <img src={Logo} alt='logo' className='h-12 ml-16' />
              <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center space-x-2">
            <img src={UserIcon} className='cursor-pointer h-6 w-6 inline"' alt='usericon'></img>
            <span className="text-gray-800 hover:text-gray-900">{userRole}</span>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
              <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left">
                Logout
              </button>
            </div>
          )}
        </div>
            </>
          )}
        </div>
      </div>
    </nav>
          
  );
};

export default Navbar;
