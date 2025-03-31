# Employee CRUD Application

This is a simple Employee Management CRUD application built using React and Vite. It allows users to Create, Read, Update, and Delete employee records.

## Features
- Fetch employee data from an API
- Display data using MUI Material DataGrid
- Add new employees
- Edit employee details
- Delete employees

## Technologies Used
- React.js
- Vite
- Axios (for API calls)
- MUI Material DataGrid
- PNPM (package manager)

## Setup Instructions
1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd employee-crud
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Start the development server:
   ```sh
   pnpm run dev
   ```
4. The app will be available at:
   ```
   https://mockapi.io
   ```

## Data Structure
The employee data displayed includes:
```json
{
  "id": Number,
  "firstName": "String",
  "lastName": "String",
  "email": "String",
  "phone": "String",
  "dob": "String",
  "qualification": "String"
}
```

## API Configuration
Ensure to configure the API endpoint in a secure manner by using environment variables. Do not expose the API URL in the code.

## License
This project is licensed under MIT.

