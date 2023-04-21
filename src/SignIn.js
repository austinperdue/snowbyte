import React from 'react';
import SignInForm from './components/SignInForm';


function SignIn() {
    
    
    const onSubmit = async (data) => {
        try {
            // Handle form submission here
            // call an API to authenticate the user:
            console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL); // Add this line
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signin`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });

            const result = await response.json();
            if (response.ok) {
                // Login successful, handle user login (e.g., set user data in context, navigate to the dashboard, etc.)
                console.log('Login successful:', result);
            } else {
                // Show an error message
                console.error('Login failed:', result.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            // debug
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '75vh', flexDirection: 'column' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <SignInForm onSubmit={onSubmit} />
            </div>
        </div>
    );
}

export default SignIn;