import React, { useContext, useState, useEffect } from "react";
import FilterCookbook from "./FilterCookbook";
import Searchbar from "./Searchbar";
import AddRecipe from "./AddRecipe";
import NoRecipesExist from "./NoRecipesExist";
import RecipeList from "./RecipeList";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";
import NavbarLogin from "./NavbarLogin";
import cookbookInfoImg from "./assets/cookbook-display.png";
import "./styles/Recipes.css";
import { UserContext } from "./utils/UserContext";
import { useNavigate } from "react-router-dom";
import InfoButton from "./utils/InfoButton";
import Pagination from "./Pagination";

const Cookbook = () => {
   const { isChef, isModerator, userId } = useContext(UserContext);
   const [recipesExistInDatabase, setRecipesExistInDatabase] = useState(false);
   const [userRecipes, setUserRecipes] = useState([]); // all recipes
   const [filteredRecipes, setFilteredRecipes] = useState([]);

   // State to manage pagination
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage, setpostsPerPage] = useState(8);
   const recipesPerPage = 12; // Number of recipes to display per page
   //limit for showing ...
   const [limit, setLimit] = useState(5);

   // redirect to home if logged out
   const navigate = useNavigate();
   if (!isChef && !isModerator) {
      navigate("/");
   }

   // check if DB has recipes
   async function checkUserRecipeCount() {
      fetch("https://replicake.onrender.com/recipes/view", {
         method: "GET",
      })
         .then((response) => {
            if (response.status === 200) {
               setRecipesExistInDatabase(true);
            } else {
               // no recipes exist
               setRecipesExistInDatabase(false);
            }
         })
         .catch((error) => {
            console.log("===== ERROR =====");
            console.log(error);
         });
   }

   // get all recipes from DB with pagination
   async function getUserRecipesFromDB() {
      console.log("== getUserRecipesFromDB ==");
      try {
         const response = await fetch(
            //`https://replicake.onrender.com/recipes/view?page=${currentPage}&limit=${recipesPerPage}`
            `https://replicake.onrender.com/recipes/view?page=${currentPage}&limit=${recipesPerPage}`,
            {
               method: "GET",
            }
         );
         if (!response.ok) {
            throw new Error("Failed to fetch user recipes");
         }
         const data = await response.json();
         if (Array.isArray(data)) {
            setUserRecipes(data);
            setFilteredRecipes(data); // copy of recipes to API reduce calls
         } else {
            console.log("Data is not an array:", data);
            setUserRecipes([]);
         }
      } catch (error) {
         console.log("===== ERROR =====");
         console.log(error);
      }
   }

   // filter functionality
   const filterRecipes = (filteredArray) => {
      if (filteredArray.length == 3 && Array.isArray(filteredArray)) {
         const newRecipes = userRecipes.filter((recipe) => {
            // 165 prep time is just infinity
            const prepTime = filteredArray[0] != 165 ? filteredArray[0] : Infinity;
            const difficulty = filteredArray[1];
            const noCuisine = filteredArray[2] == "";
            return (
              recipe.prepTime <= prepTime && 
              recipe.recipeDifficulty <= difficulty &&
              (recipe.tags.includes(filteredArray[2]) || noCuisine)
            );
         });
         setFilteredRecipes(newRecipes);
      }
      else {
         console.log("The filter is not the right shape");
         return userRecipes;
      };
   };

   // search bar functionality
   const searchRecipes = (searchTerm) => {
      if (Array.isArray(userRecipes)) {
         const filter = searchTerm
            ? userRecipes.filter(
                 (recipe) =>
                    recipe.title && recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : userRecipes;

         setFilteredRecipes(filter);
      } else {
         console.log("Data is not an array:", data);
         setFilteredRecipes([]);
      }
   };

   // Fetch data when the page state or recipesPerPage changes
   useEffect(() => {
      async function fetchData() {
         await checkUserRecipeCount();
         if (recipesExistInDatabase) {
            await getUserRecipesFromDB();
         }
      }
      fetchData();
   }, [userId, recipesExistInDatabase, currentPage]);

   // calculate first and last post to be displayed on current page
   const lastPostIndex = currentPage * postsPerPage;
   const firstPostIndex = lastPostIndex - postsPerPage;
   //hide data that is not shown
   const currentPost = filteredRecipes.slice(firstPostIndex, lastPostIndex);
   //get total pages
   const totalPages = Math.ceil(filteredRecipes.length / limit);

   return (
      <div className="dashboard">
         {/*Search bar*/}
         {isChef && <NavbarLogin />}
         {isModerator && <NavbarAdmin />}
         {!isChef && !isModerator && <Navbar />}
         <div className="filter-search-wrapper">
            <FilterCookbook filteredItems={filterRecipes} />
            <Searchbar onSearch={searchRecipes} />
            <AddRecipe setUserRecipes={setUserRecipes} />
         </div>
         <div className="recipelist-wrap">
            {!recipesExistInDatabase && <NoRecipesExist />}
            {/* check if userRecipes is loaded before rendering */}
            {recipesExistInDatabase && filteredRecipes.length > 0 ? (
               <>
                  <RecipeList recipes={currentPost} />
                  {/* Pagination here - grab current content on page and display */}
                  <Pagination
                     totalPosts={filteredRecipes.length}
                     postsPerPage={postsPerPage}
                     setCurrentPage={setCurrentPage}
                     currentPage={currentPage}
                  />
               </>
            ) : null}
            {/* Info Button on Bottom Right */}
            <InfoButton InfoImg={cookbookInfoImg} />
         </div>
      </div>
   );
};

export default Cookbook;
