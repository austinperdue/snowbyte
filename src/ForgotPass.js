import React, {useState} from 'react';
import ForgotPassForm from './components/ForgotPassForm';
import { useNavigate } from 'react-router-dom';

function ForgotPass() {
    
    // user state for error message when login fails
    const [errorMessage, setErrorMessage] = useState(null);

    // navigate
    const navigate = useNavigate();
    
    
    const onSubmit = async (data) => {
        try {
            // Handle form submission here
            // call an API to authenticate the user:
            console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL); // Add this line
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });

            const result = await response.json();
            if (response.ok) {
                // Login successful, handle user login (e.g., set user data in context, navigate to the dashboard, etc.)
                console.log('Password reset successful:', result);

                // redirect to user sign in page
                navigate('/signin');

                
            } else {
                // Show an error message
                console.error('Password reset failed:', result.message);
                setErrorMessage('Invalid security answer');
            }
        } catch (error) {
            // Show an error message
            console.error('Error during reset:', error);
            setErrorMessage('An error occurred');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '75vh', flexDirection: 'column', paddingTop: '4em', paddingBottom: '4em' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ForgotPassForm onSubmit={onSubmit} errorMessage={errorMessage} />
            </div>
        </div>
    );
}

export default ForgotPass;