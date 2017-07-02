# BAMAZON

## An Amazon-like retail tracking & order system, updating items for sale in Node, using a mySQL database.

#### I'd like to start by saying that once I turn off the MySQL connection, I have to go through SQL again,
#### the app doesn't automatically re-connect. I purposefully used Heroku's 'JAWS/Maria' add-ons so I could
#### preserve this connection and be able to show the app to people from anywhere (in the future, that is,
#### since I intend to keep building on it.) But I am still learning how to deploy... 

#### If you want to try this as a CLI program & need the SQL connection, or if it's not creating the
#### table from the get-go (I think the table itself has a bug,) this is my connection info:

```
var connection = mysql.createConnection({
host: "olxl65dqfuqr6s4y.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
port: 3306,
user: "otctzaj5ktg8bdja",
password: "om6qg4tak4uuuel7",
database: "r8hnulrvy9z046ju"
});

```
Here is a link to the Google Slideshow that presents screenshots of the working CLI app:

[Google Slideshow](https://docs.google.com/presentation/d/1Bm8BdWKBz_qvfBlBGRQ9gf1VYcVP1L__7sormKXwzes/edit?usp=sharing)

* Video coming soon...*
