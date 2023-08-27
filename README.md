# RepliCake - Recipe App

~Access on [Replicake](https://replicake.onrender.com/)~

Group Members:
* Jai Malhi
* Chau Pham
* Phillip Nguyen
* Lotus Liu
* Sean Lam

## Project Abstract:
Replicake is an online recipe aggregator allowing chefs to upload recipes for other people to use. Guests can view and browse recipes while logged-in users can also rate, and comment on others’ recipes and upload their own creations. Moderators will manually filter out inappropriate recipes which users try to upload, and malicious comments. Besides these features, there will be tags to filter down recipes. In these recipes, users can check for the nutrient value of each ingredient using Edamam’s Food Database API. When a user is not signed-in, the main feed will display mostly beginner-friendly recipes. Signed-in users will receive a feed of personalized recipes based on chosen tags. There will be a virtual cookbook where users can compile recipes they like into a PDF format and save or share them with others. 

### /user endpoints:
- `@GetMapping("/users/view")` 
    - view all users in users table
    - returns JSON user object to frontend
- `@PostMapping("/users/login")` 
    - User login by frontend sending JSON user object to back
    - object should have *email & password*, other values ignored by backend
    - returns user object if successful, returns null otherwise
- `@PostMapping("/users/signup")`
    - add a user to the users table via signup page
    - returns true for successful creation, false otherwise
    - returns false if user with that email exists
- `@PutMapping("/users/update/{uid}")`
    - Update user attributes via uID
    - For user self-updating, front should only provide access to name & email; other attributes left as they were
    - JSON user object expected from frontend
    - returns true for success, false otherwise
- `@PutMapping("/users/update/password/{uid}")`
    - update user password via uID 
    - frontend should send JSON consisting of `newPassword` & `oldPassword` variables
    - Mapping will compare oldPassword against the password in the DB, if correct password will be changed to newPassword
    - returns true for success, false otherwise
- `@DeleteMapping("/users/delete/{uid}")`
    - delete any user in user table via uID
    - returns true for success, false otherwise

### /recipes endpoints:
- `@GetMapping("/recipes/view")`
    - view all recipes in recipe table
    - returns JSON recipe object to frontend
- `@GetMapping("/recipes/view/{rid}")`
    - view recipe in recipe table via recipe ID (rid)
    - returns JSON recipe object to frontend
- `@PostMapping("/recipes/create")`
    - create a recipe within the DB
    - expects JSON body in response
    - returns true upon successful creation, false otherwise
- `@DeleteMapping("/recipes/delete/{rid}")`
    - delete any user in user table via recipe ID (rid)
    - returns true for success, false otherwise
- `@GetMapping("/recipes/find/{uid}")`
    - get all recipes created by user with uid
    - returns recipe list if they have created recipes, null otherwise

### Development Information:
- Refer to `dev-help.md` for start up and other information
- Anything that uses uID within endpoint is to only be used for a logged in user
- To avoid reaching API request limit, avoid page refreshing & restarting the vite dev build
  
### Technologies Utilized:
- Java Spring (backend)
- ReactJS (frontend)
- PostgreSQL (database)
- Render.com (hosting)
