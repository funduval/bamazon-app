# bamazon-app 

### An Amazon-like system of updating items for sale in Node, using a mySQL database.


## Hi and welcome to my README presentation of the bamazon-app. 

#### I'd like to start by saying it is mostly working well except that once I turn off the MySql connection,
#### app doesn't automatically re-connect! This is sad because I purposefully used Heroku's 'JAWSDB/Maria'
#### launching method so I could preserve this connection somewhere and be able to show the app (in the future
#### I intend to keep building on it) from anywhere. So, if you get thrown off, or if it's not creating the
#### table from the get-go (I worry the table itself has a bug,) here's my connection info:

`var connection = mysql.createConnection({`
`host: "olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",`
`port: 3306,`
`user: "otctzaj5ktg8bdja",`
`password: "om6qg4tak4uuuel7",`
`database: "r8hnulrvy9z046ju"`
`});`


Here is a link to the google slideshow that presents screenshots of the working CLI app:

[Google Slideshow](https://docs.google.com/presentation/d/1Bm8BdWKBz_qvfBlBGRQ9gf1VYcVP1L__7sormKXwzes/edit?usp=sharing)

** Video coming soon...I have never found a screencapture app that is intuitive.

