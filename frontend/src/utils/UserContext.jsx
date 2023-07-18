// UserContext.js
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
   const [isChef, setIsChef] = useState(false);
   const [isModerator, setIsModerator] = useState(false);
   const [nameValue, setNameValue] = useState("");
   const [userId, setUserId] = useState(-1);
   const [emailValue, setEmailValue] = useState("");

   useEffect(() => {
      // Check if the user is already signed in on page load
      const storedIsChef = localStorage.getItem("isChef");
      const storedIsModerator = localStorage.getItem("isModerator");
      const storedName = localStorage.getItem("name");
      const storedUserId = localStorage.getItem("userId");
      const storedEmail = localStorage.getItem("email");

      // JSON parse converts values back into bools
      if (storedIsChef && storedIsModerator && storedName) {
         setIsChef(JSON.parse(storedIsChef));
         setIsModerator(JSON.parse(storedIsModerator));
         setNameValue(storedName);
         setUserId(parseInt(storedUserId));
         setEmailValue(storedEmail);
      }
   }, []);

   useEffect(() => {
      // Save the user's sign-in status and other details in local storage whenever they change
      localStorage.setItem("isChef", JSON.stringify(isChef));
      localStorage.setItem("isModerator", JSON.stringify(isModerator));
      localStorage.setItem("name", nameValue);
      localStorage.setItem("userId", JSON.stringify(userId));
      localStorage.setItem("email", emailValue);
   }, [isChef, isModerator, userId, nameValue, emailValue]);

   return (
      <UserContext.Provider
         value={{
            isChef,
            setIsChef,
            isModerator,
            setIsModerator,
            nameValue,
            setNameValue,
            userId,
            setUserId,
            emailValue,
            setEmailValue,
         }}
      >
         {children}
      </UserContext.Provider>
   );
}

export default UserProvider;
