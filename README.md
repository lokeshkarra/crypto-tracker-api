---

# **Crypto Tracker Api**

This repository contains the implementation of the backend assignment for the KoinX Backend Internship. The project is designed using *Node.js* and *MongoDB*, and it follows modular structure.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [API Documentation](#api-documentation)




## *Features*

1. *Background Job:*
   - Fetches cryptocurrency data for Bitcoin, Ethereum, and Matic every 2 hours.
   - Data includes the current price in USD, market cap in USD, and 24-hour change.
   - Uses the [CoinGecko API](https://docs.coingecko.com/v3.0.1/reference) for fetching cryptocurrency data.

2. *APIs:*
   - /stats: Retrieves the latest data for a specific cryptocurrency.
   - /deviation: Calculates the standard deviation of the last 100 prices for a cryptocurrency.

3. *Database:*
   - Stores cryptocurrency data in MongoDB Atlas.

4. *Deployment:*
   - Hosted on AWS Elastic Beanstalk.
   - Public URL: [Crypto API Environment](http://crypto-api-env.eba-2xu2tz2m.ap-south-1.elasticbeanstalk.com/api/stats?coin=bitcoin)

---

## *Technology Stack*

- *Backend:* Node.js, Express.js
- *Database:* MongoDB
- *Scheduler:* node-cron
- *HTTP Client:* Axios

---

## *Folder Structure*

```
project-root/
├── src/
│   ├── jobs/                    # Background jobs
│   │   └── fetchCryptoData.js   # Cryptocurrency data fetching job
│   │
│   ├── controllers/             # Request handlers
│   │   ├── statsController.js   # Cryptocurrency stats controller
│   │   └── deviationController.js # Price deviation controller
│   │
│   ├── models/                  # Database models
│   │   └── Crypto.js     # Cryptocurrency price record schema
│   │
│   ├── routes/                  # API routes
│   │   ├── stats.js      # Stats endpoint routes
│   │   └── deviation.js  # Deviation endpoint routes
│   │
│   ├── utils/                   # Utility functions
│   │   └── calculateDeviation.js      # Standard deviation calculator
│   │
│   └── config/                 # Configuration files
│       └── db.js              # Database configuration
│
├── .env                     # Environment variables
├── .gitignore              # Git ignore rules
├── server.js                  # Express Application (server)
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Locked dependencies
├── eslint.config.mjs       # Lint config to enforce coding standards
└── README.md              # Project documentation
```
---

## *Getting Started*

### *Prerequisites*
- Node.js (v22 or higher)
- MongoDB (local or hosted on MongoDB Atlas)

### *Setup*

1. *Clone the Repository:*
   ```
   git clone https://github.com/your-username/koinx-backend-assignment.git
   cd koinx-backend-assignment

   ```
   

2. *Install Dependencies:*
    ```
   npm install
   ```

3. *Configure Environment Variables:*
   Create a ``` .env ``` file in the root directory and add the following:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   PORT=3000
   ```

4. *Start the Application:*
   bash
   ```
   npm start
   ```



---

## *API Documentation*

### *1. /stats (GET)*

- *Description:* Fetches the latest stats for a specific cryptocurrency.
- *Query Parameters:*
  - coin (required): One of bitcoin, ethereum, or matic-network.


---

### *2. /deviation (GET)*

- *Description:* Calculates the standard deviation of the last 100 prices for a cryptocurrency.
- *Query Parameters:*
  - coin (required): One of bitcoin, ethereum, or matic-network.


---

## Testing

### API Endpoints

#### 1. Get Cryptocurrency Statistics
Retrieves the latest price, market cap, and 24-hour change for a specific cryptocurrency.

**Endpoint:** `/api/stats`  
**Method:** GET  
**Query Parameters:**
- `coin`: The cryptocurrency ID (bitcoin, ethereum, or matic-network)

**Example Request:**
```bash
curl "http://crypto-api-env.eba-2xu2tz2m.ap-south-1.elasticbeanstalk.com/api/stats?coin=bitcoin"
```

**Sample Response:**
```json
{
    "price": 42956.78,
    "marketCap": 842956834521,
    "24hChange": -1.23
}
```

#### 2. Get Price Standard Deviation
Calculates the standard deviation of prices from the last 100 records for a specific cryptocurrency.

**Endpoint:** `/api/deviation`  
**Method:** GET  
**Query Parameters:**
- `coin`: The cryptocurrency ID (bitcoin, ethereum, or matic-network)

**Example Request:**
```bash
curl "http://crypto-api-env.eba-2xu2tz2m.ap-south-1.elasticbeanstalk.com/api/deviation?coin=bitcoin"
```

**Sample Response:**
```json
{
    "deviation": 1234.56
}
```

### Testing Tools
- [Postman](https://www.postman.com/): Recommended for API testing and exploration
- cURL: Command-line tool for making HTTP requests

### Base URL
All API requests should be made to:
```
http://crypto-api-env.eba-2xu2tz2m.ap-south-1.elasticbeanstalk.com
```

### Error Responses
In case of errors, the API will return appropriate HTTP status codes along with error messages:

```json
{
    "error": "Invalid cryptocurrency specified",
    "status": 400
}
```

Common status codes:
- 200: Successful request
- 400: Bad request (e.g., invalid parameters)
- 404: Resource not found
- 500: Internal server error
