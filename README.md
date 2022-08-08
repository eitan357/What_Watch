# What_Watch
This application is a demo application for searching series, it is built using Node and a several types of information sources.

When entering the application, you need to enter a username and password.
Within the application there is an option to search, add, edit and delete series.
In addition, you can do these actions on viewers of the series.
And of course to link each viewer to a certain series that he watched.

There are three parts to this application:
1. CinemaSite - The client side, based on Node and EJS files.
   • Inside the application you can find different layers of folders and files, for example: BL,      DAL, Router, models, etc.
     Within these files you can find the use of various information sources such as API,              Database and json files.
   
   • In addition, different modules are used such as express, jsonfile, mongoose, path, cors and      jsonwebtoken.
     Within this section there is a jwt (Json Web Token) that activates access restriction and        pages by username.
   
2. Subscriptions - The API, server side, also based on Node.
   • Similar to 'CinemaSite', here too there are folders and files of BL, DAL, Router, etc.
     This part is used as a transfer and processing of information from the client to the            database and vice versa by the routers.
     
   • Also with the modules there is a similar use to 'CinemaSite' such as mongoos, express,          axios, etc.
     In the files you can also see that there is a withdrawal of information (by axios) from an      API in the WEB that brings the initial information found within the application.
     
3. Database - Used by local MongoDB with Studio 3T.
   Inside the database you can find two different folders.
   One has a collection of the users who log into the application.
    In the second there are three collections.
    One for the series,
    the second for the viewers,
    and the third to keep the time when a viewer saw a certain movie.
