import React from 'react';
import SignUpForm from './components/SignUpForm.js';

function SignUp() {
    const onSubmit = async (data) => {
        try {
          console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL); // Add this line
      
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          const result = await response.json();
          if (response.ok) {
            console.log('User created successfully:', result);
            // Handle successful user registration (e.g., show a success message, navigate to the sign-in page, etc.)
          } else {
            console.error('User creation failed:', result.message);
            // Show an error message
          }
        } catch (error) {
          console.error('Error during user creation:', error);
        }
      };

    return (
        <div style={{ display: 'flex', minHeight: '75vh', flexDirection: 'column' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <SignUpForm onSubmit={onSubmit} />
            </div>
        </div>
    );
}

export default SignUp;