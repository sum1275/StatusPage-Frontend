# Status Page Application

A streamlined status page to manage and display the real-time status of multiple services, providing administrators with management tools and users with a public-facing status view. Built with a modern front-end framework for ease and efficiency.

## Setting up the Frontend in Local Environment

To set up UnstopFrontend locally, follow these steps:

1. **Clone the repository**:

   ```bash
   https://github.com/sum1275/StatusPage-Frontend.git
   ```

2. **Setup and Run**:
   To set up and run the Unicarta project, follow these commands:

   ```bash
   npm install
   npm run dev
   ```
3. **Environment Variables**:

   Add the following to your `.env` file:

   ```env
   VITE_BASE_URL=http://localhost:5000/api/status
   VITE_AUTH0_DOMAIN=dev-hrnip6gaswegqr1hm.us.auth0.com (example)
   VITE_AUTH0_CLIENT_ID=dek2MDznTGXxJ31lxTUFGuGo53A6YSee (example)

[Refer: Auth0 React Interactive Quickstart](https://auth0.com/docs/quickstart/spa/react/interactive)
## 4. **Application Screens**

   Follow the routes below to access various application screens:

   - **Public Facing Page**:  
     Accessible without login. Displays app information and a call-to-action button.  
     ```text
     Route: /
     ```
     
![Plivo NotLoggedIn Public](https://github.com/user-attachments/assets/9cfeb94f-3c69-4cf9-a8e8-ae184569e868)

   - **OAuth Middle Page**:  
     Handles third-party authentication flow. Redirects users to authenticate securely.  
     ```text
     Route: /auth/callback
     ```
![Plivo OAuth Screen](https://github.com/user-attachments/assets/7904c502-b9f1-493a-b3ff-ebba53718ef6)
![oAuth screen 2](https://github.com/user-attachments/assets/5ac102c6-2f1f-4d5b-97d4-16f277228c9a)


   - **Logged-In Page**:  
     The dashboard for authenticated users, showing personalized content and navigation.  
     ```text
     Route: /status
     ```
![Plivo LoggedIn](https://github.com/user-attachments/assets/da08fe81-6d66-4406-b56e-30c4035f3c30)
![Add new issue](https://github.com/user-attachments/assets/abdddb37-97ef-4d43-9e62-ddcdaad799ba)
![Add new status](https://github.com/user-attachments/assets/102767ff-7d49-4063-8497-46e237555b3d)


   - **User Management Page**:  
     Accessible to admins only. Allows managing users, roles, and permissions.  
    
![User Managment  Page](https://github.com/user-attachments/assets/37f131a7-f908-440c-a9b5-b61a5fcc4831)


