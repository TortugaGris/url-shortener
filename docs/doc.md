# URL Shortening Service Documentation

## Data Model
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
  - Endpoint: /api/shorten
  - Body:
    ```json
    {
      "url": "https://www.example.com"
    }
    ```
  - Response:
    ```json
    {
      "id": "abc123",
      "shortUrl": "https://short.url/abc123"
    }
    ```
