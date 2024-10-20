// components/Navbar.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../images/user-icon.svg';

const Navbar = () => {
  const { isLoggedIn, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleOnboarding = () => {
    navigate('/vendoronboarding');
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-white border-gray-200 shadow-md">
      <div className="flex flex-wrap items-center justify-between p-4 mx-10">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="mx-10 self-center text-2xl font-semibold whitespace-nowrap dark:text-black">ContractFlow</span>
        </a>

        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <>
              {userRole !== 'admin' && (
                <>
                  <a href="/ContractDashboard" className="text-lg font-medium text-gray-800 hover:text-gray-900">Dashboard</a>
                  <a href="/fileView" className="text-lg font-medium text-gray-800 hover:text-gray-900">Creation</a>
                  <a href="/useraddclause" className="text-lg font-medium text-gray-800 hover:text-gray-900">Review</a>
                  <a href="/Adhoc" className="text-lg font-medium text-gray-800 hover:text-gray-900">Ad-Hoc</a>
                  <a href="/editor " className="text-lg font-medium text-gray-800 hover:text-gray-900">Create Template</a>
                  <a href='/extract' className='text-lg font-medium text-gray-800 hover:text-gray-900'>Extract</a>
                </>
              )}
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center space-x-2">
                  <img src={UserIcon} className="cursor-pointer h-6 w-6 inline" alt="usericon" />
                  <span className="text-gray-800 hover:text-gray-900">{userRole}</span>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                    <button onClick={handleOnboarding} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left">
                      Onboarding
                    </button>
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
