# meetup-app

This is the meetup app I created for the udacity senior front-end developer course.
It is created with React and Redux and with an ES6 syntax.
Build tools I used are gulp and webpack. I run webpack to build the ES6 syntax to 'normal' javascript.

The application consists of the following parts

**Login / Register**

 Firstly you need to create a account to use the application and then login with your email + password.
 Your username is displayed at the meetups you create.

 if you are not logged in you will be redirected to the login page

Validations on registering:
> Username needs to be bigger then 3 characters
> Email needs to be a valid email adress
> Password needs to be bigger then 6 characters


**Create meetup**

If you login you will be able to create a meetup.
The form has some defaults, like the start date is always the date of today.

The form also has some validations.
> Name, Location, start date and end date are mandatory.
> Name needs to be longer then 3 chars
> Start date needs to be before end date.
> End date needs to be after the start date


**View meetups**

On the browse meetup tab you will see the created meetups by you and other users.


# install

- Clone the repository
- Go to the folder
- Run npm install
- Run webpack-dev-server
- Go to localhost
