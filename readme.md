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
#### User Login functioning 
#### User Logout functioning
```


```js
serverStatusCode = {
    "informational":" 1 - ** ",
    "success" : " 200 - 2** ",
    "redirection" : " 300 - 3** ",
    "clientError" : " 400 - 4** ",
    "serverError" : " 500 - 5** "
}
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

**steps to login a user :** 
- get details from the user
- validate the details - if empty or other
- check user if already or new
- if yes :- compair the password and username fields; else :- Throw Error 
- respond as program say true :- set Tokens ; else :- reject the request 

- check for user creation
- return response

**steps to logout a user :** 
- remove the refreshToken from db
- empty out the cookies for accessToken and refreshTokens
- and all set...