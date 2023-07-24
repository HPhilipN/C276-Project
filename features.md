## Main Feature Breakdown:
1. **User Recipe Submission**: Replicake will have an admin review process when a user submits their recipes to the website. The regular user will submit a form that they can enter, which includes instructions and ingredients required and optional media such as photos or videos. When they submit, the regular user will receive a confirmation message that the recipe is under review. The admin can review the submission form, and either reject or accept the recipe. The process would take around 5-7 business days. After the review process,  the regular user will receive a message in their account inbox if their recipe is approved; if so, the message will provide a link where they can check out their recipe on the Replicake website.   
2. **PDF Generation & Favourites**: All types of users will be able to create virtual cookbooks. The user can save favourite recipes and export them as pdf, where they can print a paper copy. They can also choose templates and themes for the cookbook. The cookbook can be private or public on the user’s profile, and the user can share their cookbooks via a link to registered users. 
3. **Recipe Comparison**: With Edimam/Spoonacular Food API, all users can compare their uploaded recipes with existing recipes. The website allows a side-by-side comparison that highlights similarities in the ingredients, instruction, and nutritional value. 
4. **Recipes of the Day & Filtering**: The filter options can filter preferences, dietary restrictions, calories and food types for intuitive user interactions when searching for recipes. The recipe search dashboard page can also show personalized recipe recommendations based on the user’s most used filters, trending recipes, or seasonal recommendations. 
5. **Community Engagement and Reporting**: All types of users can comment on recipes to discuss and share cooking tips. The admin user can handle user reports from the regular users, and delete offending comments so the community stays safe and respectful. 

## User Roles & Permissions:
1. Guest User:
   -  Access: Publicly accessible areas of the platform, such as browsing and searching for recipes.
   -  Purpose: To allow non-registered users to explore the platform and encourage them to sign up for an account.
2. Registered User:
   -  Access: All features available to Guest Users, plus the following:
      -  upload and view recipes
      -  comment on and review recipes.
   -  Purpose: To encourage user engagement and create a sense of community by allowing registered users to contribute their own recipes, share feedback, and interact with other users' recipes. This fosters collaboration and knowledge sharing among cooking enthusiasts.
3. Moderator:
   -  Access: Admin-like privileges with the ability to perform the following:
      -  Handle user reports related to recipe errors, rude comments, review errors, etc.
      -  Edit or remove inappropriate content.
      -  Manage user accounts and resolve user-related issues.
      -  Delete/Remove Users from the database
   -  Purpose: To ensure a safe and respectful community environment, maintain quality control, and address any issues or disputes that may arise. Moderators play a crucial role in upholding community guidelines and ensuring the platform remains a valuable resource for all users.
