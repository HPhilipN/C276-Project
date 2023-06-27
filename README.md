# RepliCake - Recipe App

Group Members:
* Jai Malhi
* Chau Pham
* Phillip Nguyen
* Lotus Liu
* Sean Lam

## Project Abstract:
Replicake is an online recipe aggregator allowing chefs to upload recipes for other people to use. Guests can view and browse recipes while logged-in users can also rate, and comment on others’ recipes and upload their own creations. Moderators will manually filter out inappropriate recipes which users try to upload, and malicious comments. Besides these features, there will be tags to filter down recipes. In these recipes, users can check for the nutrient value of each ingredient using Edamam’s Food Database API. When a user is not signed-in, the main feed will display mostly beginner-friendly recipes. Signed-in users will receive a feed of personalized recipes based on chosen tags. There will be a virtual cookbook where users can compile recipes they like into a PDF format and save or share them with others. 

### Spring endpoints: **CURRENTLY UNTESTED**
- `@GetMapping("/mod/viewUsers")` 
    - view all users in users table
    - returns JSON user object to frontend
- `@PostMapping("/user/addUser")`
    - add a user to the users table 
- `@PutMapping("/user/update/{uid}")`
    - user self-update their name, email, & password
    - JSON user object expected from frontend
    - the role-related booleans should *not* be affected here
- `@PutMapping("/mod/update/{uid}")`
    - moderator can update any attribute of a user
    - JSON user object expected from frontend
- `@DeleteMapping("/mod/delete/{uid}")`
    - delete any user in user table

### Development Information:
- Refer to `dev-help.md` for start up and other information
### Technologies Utilized:
- Java Spring (backend)
- ReactJS (frontend)
- PostgreSQL (database)
- Render.com (hosting)
