# StoryBooks

> Create public and private stories from your life

This app uses Node.js/Express/MongoDB with Google OAuth for authentication

## Usage

Add your mongoDB URI and Google OAuth credentials to the config.env file

```
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start
```

## Features
- User authentication with JWT
- Secure password storage using bcrypt
- Data validation and sanitization
- Error handling and logging
- Rate limiting to prevent brute-force attacks
- Input validation to prevent SQL Injection and XSS attacks
- Secure HTTP headers using Helmet
- Protection against CSRF attacks


## Security Practices Implemented

1. **User Authentication with JWT**: Secure authentication mechanism using JSON Web Tokens to ensure that only authenticated users can access protected routes.
    
2. **Secure Password Storage**: Passwords are hashed using bcrypt before being stored in the database, making it difficult for attackers to obtain plain-text passwords.
    
3. **Data Validation and Sanitization**: Input data is validated and sanitized to prevent SQL Injection and Cross-Site Scripting (XSS) attacks.
    
4. **Error Handling and Logging**: Proper error handling and logging mechanisms to monitor and respond to security incidents effectively.
    
5. **Rate Limiting**: Limits the number of requests a user can make to the server within a certain time period to prevent brute-force attacks.
    
6. **Secure HTTP Headers**: Helmet is used to set various HTTP headers for better security, including Content Security Policy, XSS Protection, and others.
    
7. **CSRF Protection**: Implemented Cross-Site Request Forgery protection to ensure that requests are not forged.
    

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- Bcrypt
- Helmet
- Express-rate-limit
- Joi (for input validation)
- Winston (for logging)