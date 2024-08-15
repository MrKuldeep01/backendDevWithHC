# Backend Dev. with HC
#### following the series from YouTube
#### Folder structure understanding
#### Data modeling 
#### Mongo DB connection
#### Env & git file setup [ gitignore & gitkeep ]
#### 
#### Bcrypt & JWT setup
#### Cloudinary setup
#### Multer setup
#### User Register controller with best practice


```
**steps to register new user:** 
- get details from the user
- validate the details - if empty or other
- check user if already or new
- check image and avatar and upload to cloudinary
- create user object - create entry in DB
- check for user creation
- return response
```
```js
serverStatusCode = {
    "informational":"1-99",
    "success" : "200-299",
    "redirection" : "300-399",
    "clientError" : "400-499",
    "serverError" : "500-599"
}
```