import React, { createContext, useState, useContext } from "react";

const BrandingContext = createContext();

export function useBranding() {
  return useContext(BrandingContext);
}

export const BrandingConsumer = BrandingContext.Consumer;

export function BrandingProvider({ children }) {
  const [logo, setLogo] = useState(
    "https://cdn.logo.com/hotlink-ok/enterprise/eid_422203f0-477b-492b-9847-689feab1452a/logo-dark-2020.png"
  );
  const [brandName, setBrandName] = useState("");
  const value = { logo, setLogo, brandName, setBrandName };
  return (
    <BrandingContext.Provider value={value}>
      {children}
    </BrandingContext.Provider>
  );
}
