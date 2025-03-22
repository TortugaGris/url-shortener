# URL Shortening Service Documentation

## Architecture
The application is built using a serverless architecture with the following components:

### Frontend
- Technology: Angular
- Description: The frontend is implemented using Angular, providing a responsive and interactive user interface. It 
  allows users to input long URLs, view shortened URLs, and check click statistics.

### Backend
- Technology: Firebase Functions (Node.js + Express)
- Description: The backend is implemented using Firebase Functions, which host a Node.js + Express server that acts 
  as the API for the application.
  - API Function: Handles requests for shortening URLs and incrementing click count.
  - Scheduled Function: Runs once a day to delete expired links from the database.

### Database
- Technology: Firestore
- Description: Firestore is used as the database to store all data related to the shortened URLs. For security reasons, 
  the frontend reads data directly from Firestore, while the API is responsible for writing data to Firestore.

## Data Model
The data model is designed as a single document that stores all the necessary information for each shortened URL. 
### Database Structure
```json
{
  "id": "string",
  "url": "string",
  "createdAt": "Timestamp",
  "expiredAt": "Timestamp",
  "clicks": "number"
}
```
### Field Descriptions
- `id`: Unique identifier generated for the shortened URL.
- `url`: Original long URL provided by the user.
- `createdAt`: Date and time when the shortened URL was created.
- `expiredAt`: Date and time when the shortened URL will expire (3 days after creation).
- `clicks`: Click counter for the shortened URL.

## API Endpoints
### 1. Shorten a URL
  - Method: POST
  - Endpoint: /api/short-link
  - Body:
    ```json
    {
      "url": "https://www.example.com"
    }
    ```
  - Response:
    ```json
    {
      "linkId": "AwceWss"
    }
    ```
### 2. Increment click counter
  - Method: POST
  - Endpoint: /api/click
  - Body:
    ```json
    {
      "linkId": "AwceWss"
    }
    ```
  - Response:
    ```json
    {
      "url": "https://short.url/abc123"
    }
    ```
