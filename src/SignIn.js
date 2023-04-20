import React from 'react';
import SignInForm from './components/SignInForm';

function SignIn() {
    
    
    const onSubmit = async (data) => {
        try {
            // Handle form submission here
            // For example, call an API to authenticate the user:
            const response = await fetch('http://localhost:5000/api/auth/signin', {
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