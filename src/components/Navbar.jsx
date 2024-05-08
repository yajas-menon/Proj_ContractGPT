import React from 'react';

const Navbar = () => (
  <nav className="bg-white border-gray-200 shadow-md">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-10 p-4">
      <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="mx-10 self-center text-2xl font-semibold whitespace-nowrap dark:text-black">ContractGPT</span>
      </a>
      <div className="flex items-center space-x-4">
        <a href='/Adhoc' className='text-lg font-medium text-gray-800 hover:text-gray-900'>Ad-Hoc</a>
        <a href="/fileView" className="text-lg font-medium text-gray-800 hover:text-gray-900">Creation</a>
        <a href="/negotiation" className="text-lg font-medium text-gray-800 hover:text-gray-900">Negotiation</a>
        <a href="/ContractReview" className="text-lg font-medium text-gray-800 hover:text-gray-900">Approval</a>
        {/* Add more links here if needed */}
      </div>
    </div>
  </nav>
);

export default Navbar;
