// UserContext.js
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
   const [signInStatus, setSignInStatus] = useState(false);
   const [isChef, setIsChef] = useState(false);
   const [isModerator, setIsModerator] = useState(false);
   const [nameValue, setNameValue] = useState("");

   useEffect(() => {
      // Check if the user is already signed in on page load
      const storedSignInStatus = localStorage.getItem("signInStatus");
      const storedIsChef = localStorage.getItem("isChef");
      const storedIsModerator = localStorage.getItem("isModerator");
      const storedName = localStorage.getItem("name");

      if (storedSignInStatus && storedIsChef && storedIsModerator && storedName) {
         setSignInStatus(JSON.parse(storedSignInStatus));
         setIsChef(JSON.parse(storedIsChef));
         setIsModerator(JSON.parse(storedIsModerator));
         setNameValue(storedName);
      }
   }, []);

   useEffect(() => {
      // Save the user's sign-in status and other details in local storage whenever they change
      localStorage.setItem("signInStatus", JSON.stringify(signInStatus));
      localStorage.setItem("isChef", JSON.stringify(isChef));
      localStorage.setItem("isModerator", JSON.stringify(isModerator));
      localStorage.setItem("name", nameValue);
   }, [signInStatus, isChef, isModerator, nameValue]);

   return (
      <UserContext.Provider
         value={{
            signInStatus,
            setSignInStatus,
            isChef,
            setIsChef,
            isModerator,
            setIsModerator,
            nameValue,
            setNameValue,
         }}
      >
         {children}
      </UserContext.Provider>
   );
}

export default UserProvider;
