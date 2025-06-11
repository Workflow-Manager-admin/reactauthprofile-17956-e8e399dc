# reactauthprofile-17956-e8e399dc

## Environment Variables / Setup

This app requires a `.env` file in the `reactauthprofile` folder root to set the API endpoint.

Example `.env`:
```
REACT_APP_BASE_URL=https://api.example.com
```
- All API calls will be prefixed with this base URL.
- If using [Create React App](https://create-react-app.dev/docs/adding-custom-environment-variables/), only variables prefixed with `REACT_APP_` are exposed to the JS bundle!

### 1. Install dependencies

From inside the `reactauthprofile` folder:

```sh
npm install
```

### 2. Running

From inside `reactauthprofile`:

```sh
npm start
```

### 3. Notes

- After login (POST to `/api/login`), response shape must be:
  ```json
  {
    "token": "<JWT-OR-SESSION-TOKEN>",
    "profile": {
      "name": "...",
      "email": "...",
      "employee_id": "...",
      "contact_number": "..."
    }
  }
  ```
- Make sure your API allows CORS requests from your local frontend server for local development.
- Changes to `.env` require restarting the dev server to take effect.
- API calls use: `${process.env.REACT_APP_BASE_URL}/api/login` (see code).
