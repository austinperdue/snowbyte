import React, {useState} from 'react';
import SignUpForm from './components/SignUpForm.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function SignUp() {
    
    // error messages for failed to sign up
    const [errorMessage, setErrorMessage] = useState(null);

    // navigate
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
          console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL); 
      
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
            // redirect to signin page
            navigate('/signin');

          } else {
            
            console.error('User creation failed:', result.message);
            // Show an error message
            setErrorMessage('Email already in use, try another');
          }
        } catch (error) {
          console.error('Error during user creation:', error);
                      // Show an error message
                      setErrorMessage('Try again later');
        }
      };

    return (
        <div style={{ display: 'flex', minHeight: '75vh', flexDirection: 'column', paddingTop: '4em', paddingBottom: '4em'}}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <SignUpForm onSubmit={onSubmit} errorMessage={errorMessage} />
            </div>
        </div>
    );
}

export default SignUp;