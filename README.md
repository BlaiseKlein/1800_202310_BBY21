# Project Title
Transit Talk BCIT

## 1. Project Description
State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  
Our team, team 21, is developing a web app called Transit Talk BCIT to help BCIT commuters easily share and receive info about the conditions of nearby roads and bus loops by posting and searching for multimedia posts with filters such as location or type- unlike Google Maps, we will focus on BCIT and its direct routes.


## 2. Names of Contributors
List team members and/or short bio's here... 
* Blaise Klein, I'm excited for this project... I think
* Hi, my name is Jimmy Tsang. I'm excited about this project because I get to explore the git/github workflow! :)
* Huarui Ji

## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Titillium Web Font
* Google Material Icons
* Google Material Symbols
* Train used in logo: Freepik.com. The logo has been designed using assets from Freepik.com.
* Backgroundblurred.jpg: Background from https://www.wallpaperflare.com/, modified in Photoshop.
* Background2.jpg: Background designed by colli13designs from Pixabay, modified in Photoshop. License: No attribution required.

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Login by clicking "Sign in", or click "View all posts" if you wish to see posts without logging in.
* Once logged in, click either Create a post, or View all posts. You can also click the dropdown menu on the top left for Home, User Settings, and Logout.
* If you click Create Post, fill in all required info, and click "Post Now". 
* You can access posts that you've made by clicking "My Posts" in the navbar. Click the trash icon in a post that you've made to delete your post.
* When you view posts, you can filter them by location or by transport type. You can set personal preferences by clicking on the dropdown menu on the top left, and clicking User Settings.

## 5. Known Bugs and Limitations
Here are some known bugs or limitations:
* No check on character limit 
* No check on file size
* Cannot put both a transport filter AND a location filter on at the same time when viewing posts.

## 6. Features for Future
What we'd like to build in the future:
* Allow accepting video files.
* Allow for editing posts.
* Building a moderation system with report post/user function.
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── main.html                # The main HTML page that users get to after they login.
├── login.html               # The login HTML page that uses firebase to login.
├── navbar.html              # The HTML navbar loaded onto all pages when no user is logged in.
├── footer.html              # The HTML footer loaded onto all pages.
├── loginnavbar.html         # The HTML navbar loaded onto all pages when a user is logged in.
├── myPosts.html             # An HTML page that shows all posts made by the currently logged in user, queries firestore.
├── postViewing.html         # The HTML page that shows all the user posts and allows them to filtered, queries firestore.
├── settings.html            # The HTML page that shows the user settings and allows their filters and name to be changed, queries firestore.
├── upload.html              # The HTML page that allows users to upload posts, stores on firestore.
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /backgroundblurred.jpg   # [BCIT Campus Photograph]. Wallpaperflare. https://www.wallpaperflare.com burnaby-canada-british-columbia-institute-of-technology-bcit-wallpaper-eiuek
    /background2.jpg         # [White pattern background digital illustration]. Pixabay. https://pixabay.com/illustrations/geometric-triangle-modern-mosaic-1906240/
    /bcitlogo.png            # [Train digital illustration.] Freepik. https://www.freepik.com/free-vector/abstract-high-speed-train-logo_789917.htm#query=train%20logo&position=1&from_view=search&track=ais
    /noimage.jpg             # [Train digital illustration.] Freepik. https://www.freepik.com/free-vector/abstract-high-speed-train-logo_789917.htm#query=train%20logo&position=1&from_view=search&track=ais

├── scripts                  # Folder for scripts
    /authentication.js       # Login authentication JS file, uses firebase.
    /filter.js               # Filter system JS file used in postViewing.html, uses firestore
    /logout.js               # User logout system, uses firebase.
    /myPosts.js              # User post display system, JS file that uses firestore.
    /firebasesetup.js        # JS File, API keys used for firebase, included in .gitignore
    /navandfoot.js           # JS FIle that Loads the navbar and footer onto all pages.
    /upload.js               # JS File that allows users to upload posts, uses firestore.
    /userdata.js             # JS File that manages the settings page, allows changes to firestore from user input.
├── styles                   # Folder for styles
    /style.css               # The CSS used across all HTML pages. 



```


