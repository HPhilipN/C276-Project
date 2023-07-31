import React, { useContext, useState, useEffect } from "react";
import Filter from "./Filter";
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

const Cookbook = () => {
   const { isChef, isModerator, userId } = useContext(UserContext);
   const [recipesExistInDatabase, setRecipesExistInDatabase] = useState(false);
   const [userRecipes, setUserRecipes] = useState([]); // all recipes
   const [filteredRecipes, setFilteredRecipes] = useState([]);

   // State to manage pagination
   const [currentPage, setCurrentPage] = useState(1);
   const recipesPerPage = 2; // Number of recipes to display per page

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
   const filterRecipes = () => {
      
   }

   // search bar functionality
   function searchRecipes(searchTerm) {
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
   }

   // Handler for page change
   const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   // Go to the previous page
   const handlePreviousPage = () => {
      if (currentPage > 1) {
         setCurrentPage((prevPage) => prevPage - 1);
      }
   };

   // Go to the next page
   const handleNextPage = () => {
      if (currentPage < Math.ceil(userRecipes.length / recipesPerPage)) {
         setCurrentPage((prevPage) => prevPage + 1);
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
   }, [userId, recipesExistInDatabase, currentPage, recipesPerPage]);

   return (
      <div className="dashboard">
         {/*Search bar*/}
         {isChef && <NavbarLogin />}
         {isModerator && <NavbarAdmin />}
         {!isChef && !isModerator && <Navbar />}
         <div className="filter-search-wrapper">
            <Filter filteredItems={filterRecipes} />
            <Searchbar onSearch={searchRecipes} />
            <AddRecipe setUserRecipes={setUserRecipes} />
         </div>
         <div className="recipelist-wrap">
            {!recipesExistInDatabase && <NoRecipesExist />}
            {/* check if userRecipes is loaded before rendering */}
            {recipesExistInDatabase && filteredRecipes.length > 0 ? (
               <>
                  <RecipeList recipes={filteredRecipes} />
                  {/* Basic paginator */}
                  {userRecipes.length > recipesPerPage && (
                     <div className="pagination">
                        <button onClick={handlePreviousPage}>Prev</button>
                        {[...Array(Math.ceil(userRecipes.length / recipesPerPage))].map(
                           (_, index) => (
                              <button
                                 key={index + 1}
                                 onClick={() => handlePageChange(index + 1)}
                                 className={currentPage === index + 1 ? "active" : ""}
                              >
                                 {index + 1}
                              </button>
                           )
                        )}
                        <button onClick={handleNextPage}>Next</button>
                     </div>
                  )}
               </>
            ) : null}
            {/* Info Button on Bottom Right */}
            <InfoButton InfoImg={cookbookInfoImg} />
         </div>
      </div>
   );
};

export default Cookbook;
