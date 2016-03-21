A large part of back-end programming is interfacing with external APIs. This assignment is an opportunity to learn backend programming beyond the usual CRUD database operations.

Specifically, your app will have a collection of users, and each user will have a collection of files. However, your api will not accept actual files, nor will it return actual files (HTTP with binary data, while possible, is a little messy for the purposes of this assignment). Instead, when creating a new file you will post a json representation of a file, such as:

`superagent /users/:user/files post ' {"fileName": "fileOne": "content": "hello world!"}`

On your backend you will then create a file named fileOne, with the contents "hello world!". This is a lot like the http with persistance assignment.

Next, instead of saving this file to your mongo database, you will save it to your s3 account. You will then store in your mongo database the url to retrieve this file from s3.

When serving a get request for the file. i.e. GET /users/:user/files/:file return a json object that contains the url the the file location on S3.

As files are owned by users, I expect you to use nested resources. This resources should be as RESTful as possible. Specifically, your app should contain the following routes and associated operations:
```
GET /users

POST /users

GET /users/:user

PUT /users/:user

DELETE /users/:user

GET /users/:user/files

POST /user/:user/files

GET /files/:file

PUT /files/:file (replace an already existing file, or update it somehow. I'll leave this up to interpretation)

DELETE /files/:file
```


Feel free to work in groups, but be sure to credit each other. Also...

**DO NOT HARDCODE YOUR AMAZON SECURITY TOKENS INTO YOUR APP. IF YOU COMMIT THOSE TO GITHUB BY MISTAKE, BAD THINGS CAN/WILL HAPPEN.**



Submit a link to the project repo. With your submission add a comment that contains: how long it took to complete the project; a reflection on your individual process and contributions.



Finally take note this assignment is intentionally ambiguous in some ways. When you're out in the real world, your boss is gonna tell you WHAT your code should do, not HOW you do it. Another important aspect of this project is becoming a proficient documentation reader. This skill is crucial for a practicing developer, as you will be constantly referencing manuals and learning new things. I'll be giving a brief high level overview of how S3 works in class, but I'm intentionally leaving the nitty-gritty to you. This may seem harsh now, but you'll be glad later!



**Rubric:**

10 points for including all routes

5 Points for using mongoose population

5 Points for testing. (an earnest attempt will suffice. 100% testing is beyond scope for this assignment

Extra Credt: 5 points for getting multipart-body requests working (images, binary data, etc)



HINT You'll want to interact with s3 via the node SDK: http://aws.amazon.com/sdk-for-node-js/
