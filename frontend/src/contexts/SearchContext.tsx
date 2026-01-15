import React, { useContext, useState } from "react";

type SearchContextType = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => void;
};

const SearchContext = React.createContext<SearchContextType | undefined>(
  undefined
);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [destination, setDestination] = useState(
    sessionStorage.getItem("destination") || ""
  );

  const [checkIn, setCheckIn] = useState(
    new Date(sessionStorage.getItem("checkIn") || new Date().toISOString())
  );

  const [checkOut, setCheckOut] = useState(
    new Date(sessionStorage.getItem("checkOut") || new Date().toISOString())
  );

  const [adultCount, setAdultCount] = useState(
    Number(sessionStorage.getItem("adultCount") || 1)
  );

  const [childCount, setChildCount] = useState(
    Number(sessionStorage.getItem("childCount") || 0)
  );

  const [hotelId, setHotelId] = useState(
    sessionStorage.getItem("hotelId") || ""
  );

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    sessionStorage.setItem("adultCount", adultCount.toString());
    sessionStorage.setItem("childCount", childCount.toString());

    if (hotelId) {
      setHotelId(hotelId);
      sessionStorage.setItem("hotelId", hotelId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be used within SearchContextProvider"
    );
  }
  return context;
};
