# Car Maintenance Management App
## Description
This is a web-based application designed to keep track of all your vehicles and their maintenance, while also helping you monitor expenses.
## Getting Started
### Links:
- **Deployed App**: [Visit the deployed app](https://car-maintenance-frontend.vercel.app/auth/login)
- **Project Planning (Trello)**: [Project Planning on Trello](https://trello.com/b/czCmIUFS/car-maintenance-management-app)
- **Backend Repository**: [Backend Repository on GitHub](https://github.com/alisam132/car-maintenance-management-app)
- **Frontend Repository**: [Frontend Repository on GitHub](https://github.com/alisam132/car-maintenance-management-app)
### Prerequisites
- **Django**: Make sure you have [Django](https://www.djangoproject.com/) installed.
- **React**: Make sure you have [React](https://react.dev/) installed.
### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/alisam132/car-maintenance-management-app
    cd frontend
2. Install dependencies:
    Create a `.env` file with the following variables:
    VITE_API_URL="http://127.0.0.1:8000"
    ```bash
    npm install
    ```
3. cd backend
4. install all packeges inside the shell:
```
    pipenv shell
    plaintext
    pipenv install django
    pipenv install djangorestframework
    pipenv install djangorestframework-simplejwt
    pipenv install django-cors-headers
    Start the server for backend:
    bash
    python3 manage.py makemigration
    python3 manage.py migrate
    python3 manage.py createsuperuser
    python3 manage.py runserver
```
5. Start the server for frontend:
    ```bash
    npm start
    ```
    ## Usage
- Visit `http://localhost:5173` in your browser to access the application.
- Log in with your credentials or sign up if you’re a new user.
- Manage Cars and Maintenance Records from the user dashboard.


[![login-page.jpg](https://i.postimg.cc/cLFkxqh5/login-page.jpg)](https://postimg.cc/VJbWgV3j)
[![Signup-page.jpg](https://i.postimg.cc/Y0N8TTjR/Signup-page.jpg)](https://postimg.cc/JHnbk6NH)
[![Home-page.jpg](https://i.postimg.cc/fbXdHmVj/Home-page.jpg)](https://postimg.cc/94mz04tr)
[![Car-Create-Page.jpg](https://i.postimg.cc/cHbFQf27/Car-Create-Page.jpg)](https://postimg.cc/hzV8nQSh)
[![Car-Detailes-Page.jpg](https://i.postimg.cc/133MYCS0/Car-Detailes-Page.jpg)](https://postimg.cc/SJHWnGJj)
[![Car-Edit-Page.jpg](https://i.postimg.cc/dt4jd2Ch/Car-Edit-Page.jpg)](https://postimg.cc/ZCvNzyVm)
[![Cars-List-Page.jpg](https://i.postimg.cc/05CYRYcV/Cars-List-Page.jpg)](https://postimg.cc/grnX3Z9h)
[![Maintenance-Car-Detailes-page.jpg](https://i.postimg.cc/wMxsTr00/Maintenance-Car-Detailes-page.jpg)](https://postimg.cc/7GcLKKv2)
[![Maintenance-Car-Edit-Page.jpg](https://i.postimg.cc/Y0XL4xPk/Maintenance-Car-Edit-Page.jpg)](https://postimg.cc/xNz1hLYF)
[![Maintenance-Car-List-View.jpg](https://i.postimg.cc/R0c31mYg/Maintenance-Car-List-View.jpg)](https://postimg.cc/XZY73R45)


## Technologies Used
- **React**: Frontend framework.
- **Django**: Backend framework.
- **Postgres**: Database for storing user and insurance policy data.
- **simple-JWT**: Authentication via JSON Web Tokens.
- **Axios**: For making HTTP requests.
- **Bcrypt**: For password hashing.
- **HTML**: for Structure.
- **CSS**: for styling.
- **bootstrab**: for styling.
## Next Steps / Planned Enhancements

1. **User Profile Management**: Implement the ability for users to update their profile information, including email, phone number, and password.
2. **Dashboard**: Add a user dashboard to provide an overview of the user's active Cars, Total Expences for each car, and more.
3. **Search Functionality**: Allow users to search for car records by Shop name, date .
4. **Responsive Design**: The project is designed for mobile phone and need an improvements to be suitable for website page.
5. **Overall amount for each car**: Allow user see how many expences for each car