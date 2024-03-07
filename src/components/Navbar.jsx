import React from 'react';

const Navbar = () => (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ContractGPT</span>
      </a>


    </div>

  </nav>
);

export default Navbar;
