## Requirements

To run this application, you will need:

* Docker installed on your machine
* A terminal or command prompt

## Installation

To install this application, follow these steps:

* Clone this repository to your machine: `git clone https://github.com/JHorlamide/yassir-backend.git`
* Navigate to the project directory: `cd yassir-backend` and create your .env file following the .env.example file

## Running the Application

To start the application use docker compose:

* `docker-compose up --build`
* To test the API endpoints, you can use a tool like [Postman](https://www.postman.com/downloads/) or [curl](https://curl.se/). For example, to create a new resource using `curl`, you can run the following command:

  * ```
    curl -X POST -H "Content-Type: application/json" -d '{ "name": "Growth", "description": "Scale the business" }' http://localhost:8080/api/air-quality?latitude=48.856613&longitude=2.352222
    ```

## Usage

The API endpoints of this application are described below:

* `GET /api/air-quality?latitude=''&longitude=''`: Returns the air quality for the given coordinate in the query parameters.
* `GET /api/most-polluted`: Returns datetime(date and time) where the paris zone is the most polluted.

## Running Test

To ensure the reliability and accuracy of the application, I have implemented a simple suite of tests. While these tests are not exhaustive, but they cover some critical aspects of the API implementation. To run the tests, use the following commands:

* To run the tests in watch mode, use the command `npm run test:watch`.
* To run the tests without watch mode, use the command `npm run test`.

I take application testing seriously and am committed to ensuring the highest possible quality of software :)
