# CMPT 276 Project - Recipe App

Group Members:
* Jai Malhi
* Chau Pham
* Phillip Nguyen
* Lotus Liu
* Sean Lam

### Project Abstract:

Replicake is an online recipe aggregator allowing chefs to upload recipes for other people to use. Guests can view and browse recipes while logged-in users can also rate, and comment on others’ recipes and upload their own creations. Moderators will manually filter out inappropriate recipes which users try to upload, and malicious comments. Besides these features, there will be tags to filter down recipes. In these recipes, users can check for the nutrient value of each ingredient using Edamam’s Food Database API. When a user is not signed-in, the main feed will display mostly beginner-friendly recipes. Signed-in users will receive a feed of personalized recipes based on chosen tags. There will be a virtual cookbook where users can compile recipes they like into a PDF format and save or share them with others. 


### Project Details

Replicake is an online recipe aggregator allowing chefs to upload recipes for other people to use. 

### Competitive Analysis

One existing website for finding cooking recipes is Epicurious. The formatting and UI is professional and there is a rating system for existing recipes. However, Epicurious has a limited number of free recipes and users will need to pay a monthly subscription fee of $2.50 to get digital access to more recipes. Additionally, there are malicious ads sponsored on the website, which is detrimental to user experience. 

Another is Yummly. The interface is easy to navigate and has modern elegance. There are 2 main issues with Yummly however. First, the directions for a recipe are not hosted on the Yummly website itself. Chefs without a separate blog for recipe directions cannot post their recipes and users are forcibly directed to outside websites, which may have malicious ad  that distract the users from reading the recipe directions. Secondly, Yummly constantly advertises its mobile app on its website. It becomes a very frustrating experience for the user to constantly have half their screen covered by a scrollable ad. 

As the analysis above shows, many existing recipe and cookbook applications have limitations such as difficult recipes with ingredients that are hard to obtain, and Replicake will be a solution to these issues.

We aim to allow cooking enthusiasts with varying degrees of skill to upload and discover different types of food recipes. Some interesting features to add to our web app would be ratings for each recipe, and a tagging system to allow users to filter recipes by calories, vegetarian-friendly etc…

This allows users with dietary restrictions and other health concerns to easily find recipes that suit their diet and can be made at home. This app is intended to be educational, helping users with an interest in cooking develop their passions. 

### Target Audience

The target audience of Replicake is primarily adults who can cook but should be accessible to everyone who wishes to try out cooking or baking. Chefs with a higher degree of skill can find recipes for elaborate desserts and dishes and beginners can find easy-to-follow recipes to make a simple meal. 

Our project has 5 main features listed above in the feature breakdown, allowing users to submit, find and compile recipes on the website.

Here are a few sample stories for our project.

Story 1: Sam wants to find a good salad recipe so that he can control his diet. The web app must allow for filtering by food type/calories/keyword and display the filtered page on the screen with all recipes tagged appropriately. The workflow would be detecting and filtering by user input, refreshing the recipe database to exclude non-relevant entries, and displaying the updated page after clicking. Some tests for this story could include: if the user types incorrectly, making sure the recipes are displayed the same each time, or having the website check for misspellings and recommend the correct option. This could include an auto suggest feature when typing, or when a user seems to like certain types of recipes.

Story 2: Patrick wants to eat something that’s not instant noodles for the 50th time in a row because Ward is concerned about Patrick's health. Desperate for options, Patrick goes to Replicake to prevent him from being scolded. Patrick is deterred by anything which takes too much perceived effort; he must be able to view a recipe without signing in. The web app must allow 2-5 ingredient recipes with minimal steps to be displayed without the use of filtering or scrolling. The website should display recommended recipes on the homepage so people like Patrick can easily view and make the food recipes. 

Each main feature will be tasked to one member of the group. As each main feature may include subsystems that arise from complexity in searching for recipes or filtering, there is a fair amount of work for each member.




### Group Meetings and Communication


### Meeting plans


Weekly meetings are scheduled for Wednesdays and/or Fridays at 12:30 pm and usually last around an hour. We plan to communicate via Discord and in-person meetings, with a generally flexible schedule to accommodate each group member’s availability. Tasks for each group member will be assigned on Trello and write-ups/documentation will be shared on Google Docs and later committed to the group Git repository. Each group member will work on a separate branch on a feature before getting approval from at least two other group members in order to merge with the main branch. 


### Summary of the first meeting


First, we created a discord channel where all group members could communicate and get help in real time. We discussed interesting project ideas everyone had an interest in and compiled a comprehensive list. Following that, we researched free APIs that could be incorporated into our project. We ended up deciding on a recipe web application where users could upload and view recipes. 


### Plans for subsequent meetings


First, we plan to discuss the login and registration features that need to be implemented. Then we will need to create user stories for each type of user: guest users, registered users and moderators. Finally, we will distribute tasks to each group member according to their capabilities. 



