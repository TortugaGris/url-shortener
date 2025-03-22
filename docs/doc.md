# URL Shortening Service Documentation

## Architecture
The application is built using a serverless architecture with the following components:

### Frontend - Angular
The frontend is implemented using Angular, providing a responsive and interactive user interface. It allows users to 
input long URLs, view shortened URLs, and check click statistics.
-Dependencies:
  - Tailwind CSS: Used for styling the user interface. Tailwind CSS provides a utility-first approach to styling, 
  making it easy to create responsive and visually appealing designs without writing custom CSS.
  - Luxon: Used for formatting dates in the view. Luxon simplifies the display of creation and expiration timestamps in 
  a user-friendly format.
  - Zod: Used to validate data coming from the backend and Firestore. Zod ensures that the data adheres to the expected 
  format, improving reliability and security in the frontend.

### Backend - Firebase Functions (Node.js + Express)
The backend is implemented using Firebase Functions, which host a Node.js + Express server that acts as the API for the 
application.
- API Function: Handles requests for shortening URLs and incrementing click count.
- Scheduled Function: Runs once a day to delete expired links from the database.
- Dependencies:
  - Zod: Used for schema validation in the backend. Zod ensures that incoming data (e.g., URLs) adheres to the 
  expected format, improving reliability and security.
  - Luxon: Used for date and time manipulation. Luxon simplifies handling of creation and expiration timestamps, 
  including time zone management and date comparisons.
  - CORS: Used to enable Cross-Origin Resource Sharing (CORS) in the backend. This allows the frontend 
  (hosted on a different domain or port) to securely communicate with the backend API.
  - http-status-code: Used to simplify the handling of HTTP status codes in the backend. This library provides a clean 
  and consistent way to return appropriate status codes (e.g., 200, 400, 404) in API responses.

### Database - Firestore
Firestore is used as the database to store all data related to the shortened URLs. For security reasons, the frontend 
reads data directly from Firestore, while the API is responsible for writing data to Firestore.

## Data Model
The data model is designed as a single document that stores all the necessary information for each shortened URL. 
### Database Structure
```json
{
  "id": "abc123",
  "url": "https://www.example.com",
  "createdAt": "2023-10-01T12:00:00Z",
  "expiredAt": "2023-10-04T12:00:00Z",
  "clicks": 42
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
  - Method: `POST`
  - Endpoint: `/api/short-link`
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
  - Method: `POST`
  - Endpoint: `/api/click`
  - Body:
    ```json
    {
      "linkId": "AwceWss"
    }
    ```
  - Response:
    ```json
    {
      "url": "https://www.example.com"
    }

    ```

## Challenges and Limitations
### Error Handling from the Backend:
Due to time constraints, not all potential errors from the backend (e.g., Firestore read/write failures, API 
validation errors) could be fully handled and communicated to the frontend. This limited the robustness of the error 
feedback provided to users.
### Time Constraints
The project was developed within a limited timeframe, which restricted the ability to implement advanced features 
(e.g., custom URLs, detailed analytics) and fully optimize error handling.
