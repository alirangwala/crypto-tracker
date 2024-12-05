# Crypto Tracker

## Getting Started

Follow these steps to set up and run the app locally:

1. Clone this repository to your local machine
2. `npm install`
3. `npm run dev` from the root directory

## Decision Making

- I used NextJS and did most of the work on the frontend when I found out that one endpoint from blockchain.com gives all the necessary information for an address
- NextJS has a built in server that you can use with prisma. I used this because the API/database did not require too much functionality beyond what the client provides. In fact the requirements could have been satisfied without an API.
- I added a database because in the future I would like to add users and cache the addresses. This way I can use a separate endpoint from another API to fetch new transactions and save some compute. For the scope of this project I did not implement that.
- I returned the top 10 most recent transactions as to not overload the client as some addresses have thousands of transactions. In the future I will use a different API to fetch all transactions if that is what the user desires.
- I didn't have a User table because there was a time crunch but if given more time I would've added some auth and allow a user to login, store the user in the DB and save the addresses they load to that user.
- If time permitted I would also build a refresh address button or have it refresh after X amount of time. To do this I would need to add a PUT endpoint and update both the state and DB.
