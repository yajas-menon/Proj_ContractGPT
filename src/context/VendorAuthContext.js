// context/VendorAuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const VendorAuthContext = createContext();

export const useVendorAuth = () => useContext(VendorAuthContext);

export const VendorAuthProvider = ({ children }) => {
  const [isVendorLoggedIn, setIsVendorLoggedIn] = useState(() => {
    return localStorage.getItem('isVendorLoggedIn') === 'true';
  });

  const [vendorRole, setVendorRole] = useState(() => {
    return localStorage.getItem('vendorRole') || '';
  });

  useEffect(() => {
    localStorage.setItem('isVendorLoggedIn', isVendorLoggedIn);
    localStorage.setItem('vendorRole', vendorRole);
  }, [isVendorLoggedIn, vendorRole]);

  const vendorLogin = (role) => {
    setIsVendorLoggedIn(true);
    setVendorRole(role);
  };

  const vendorLogout = () => {
    setIsVendorLoggedIn(false);
    setVendorRole('');
    localStorage.removeItem('isVendorLoggedIn');
    localStorage.removeItem('vendorRole');
  };

  return (
    <VendorAuthContext.Provider value={{ isVendorLoggedIn, vendorRole, vendorLogin, vendorLogout }}>
      {children}
    </VendorAuthContext.Provider>
  );
};
