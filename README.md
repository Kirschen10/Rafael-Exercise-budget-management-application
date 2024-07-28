
# Getting Started with Rafael Exercise Budget Management Application

## Installation

1. **Clone the repository:**

   git clone https://github.com/Kirschen10/Rafael-Exercise-budget-management-application

   cd <repository_directory>  ---> Change to your folder destination


2. **Install dependencies:**

   npm install


## Running the Project

### `npm start`

This command runs both the client and server side of the application in development mode.
Open [http://localhost:3000](http://localhost:3000) to view the client side in your browser.
The server side should be available at [http://localhost:3001](http://localhost:3001).
The page will reload when you make changes.You may also see any lint errors in the console.

## Troubleshooting

If the project does not run as expected, please ensure the following:

1. **Environment Variables:**
   - Make sure your system's PATH environment variable includes the path to Node.js and MySQL binaries. 
     For example:
		 - `C:\Program Files\nodejs\`
		 - `C:\Program Files\MySQL\MySQL Server 8.0\bin`
    * Instructions on how to do this at the bottom of the page

2. **Node.js Version:**
   - The project was developed using Node.js version 20.15.1. 
   Please ensure you have this version installed. You can check your Node.js version by running:
 
     node -v


3. **MySQL Configuration:**
   - Ensure MySQL Server is installed and running.
   - Verify your MySQL credentials in the project's configuration files (e.g., `.env` or `config.js`).


# Adding PATH to Environment Variables

## Steps to Add Node.js and MySQL to the PATH Variable on Windows

1. **Open Advanced System Settings:**
   - Click on `Start` and type `Environment Variables`, then select `Edit the system environment variables`.

2. **Open Environment Variables Window:**
   - In the `System Properties` window that opens, click on the `Environment Variables...` button.

3. **Edit the PATH Variable:**
   - In the `Environment Variables` dialog, find the `Path` variable in the `System variables` or `User variables` list (depending on whether you want to set it for all users or just the current user).
   - Select the `Path` variable and click the `Edit...` button.

4. **Add Relevant Paths:**
   - In the `Edit Environment Variable` dialog, click the `New` button and add the path `C:\Program Files\nodejs\` (or the path where Node.js is installed).
   - Add another path for MySQL's bin directory: `C:\Program Files\MySQL\MySQL Server 8.0\bin` (or the path where MySQL is installed).

5. **Save Changes:**
   - Click `OK` to save the changes in the `Edit Environment Variable` dialog.
   - Click `OK` again to close the `Environment Variables` dialog.
   - Click `OK` in the `System Properties` window.

6. **Verify Changes:**
   - Open a Command Prompt window and type:
     ```sh
     echo %PATH%
     ```
   - Ensure that the paths you added appear in the list of paths.


