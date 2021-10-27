# Content-Management

I created a Portfolio Manager, which would allow a user to upload their projects, and keep track of their applications that they had submitted. 

I created this project using authentication functionality, CRUD restful routes, and EJS partials, using Mongoose, Node.js, Express, and EJS. I first finished a basic portfolio CRUD app, to which I added the application CRUD as a separate link, and then implemented the one-to-many functionality. If I were to redo this project, I would've implemented the one-to-many prior to implementing the applications CRUD. I wasn't able to fix the edit route to update unless logging out and back in, which I plan to fix with more investigation. Overall, I was able to complete the functionalities that I had set as goals in my initial wireframe, with the exception of the modal showing the job application page. A continuation of this project will be in focus of making the CSS more robust, to be on a level of similar professional hiring websites, and to add a public viewing functionality to share the portfolio with recruiters. 

My initial Wireframe was as follows:

Upload links to your projects with a small description on each project that comes up on a show page

Hiring portfolio - Upload your companies that you’ve applied to on Linked In on a separate login access only page with the company logos, name, progress on application, application submitted(checkbox). 

Only if the user logs in, will the “add new project” and “delete” options display. This will be in the navigation bar partial. 

For the most part, I completed the outlined plans in this wireframe by the end of this project.

The User Frame is as follows:

The User will be able to login, then add and access their projects with a show, edit, and delete functionality. The user will be able to enter an application page, in which the user will also be able to repeat the previous functionalities on the application page. The data stored by the user is only applicable to the user logged in, and is separate from any other users logged in.



The link to the app is: https://young-mountain-68772.herokuapp.com/portfolio

