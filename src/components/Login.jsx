import React, { useRef, useState } from 'react'
import Header from './Header'
import { Box, Button, Typography, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import { validateForm } from '../utils/validate.js';
import { auth } from '../utils/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";




const NetflixTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#333',
        borderRadius: '4px',
        '& fieldset': {
            borderColor: 'white', // 🔥 Default border
        },
        '&:hover fieldset': {
            borderColor: 'white', // 🔥 On hover
        },
        '&.Mui-focused fieldset': {
            borderColor: 'blue  ', // 🔥 On focus
        },
        '& input': {
            color: 'white',
        }
    },
    '& .MuiInputLabel-root': {
        color: '#8c8c8c',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'white',
    },
}));



const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [formErrors, setFormErrors] = useState({});


    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);


    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
        setFormErrors({});
    }


    const handleButtonclick = async (e) => {
        e.preventDefault();
        const errors = validateForm({
            name: name.current?.value || '',
            email: email.current?.value || '',
            password: password.current?.value || '',
            isSignInForm
        });

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        // 
        // else {
        //     setFormErrors({});
        //     const userData = {
        //         name: name.current?.value?.trim(),
        //         email: email.current.value.trim(),
        //         password: password.current.value.trim(),
        //     };

        //     //login and signup

        //     if (isSignInForm) {
        //         console.log('Logging in with:', userData);
        //         // name.current.value = '';
        //         email.current.value = '';
        //         password.current.value = '';
        //         // add your login logic here
        //     } else {
        //         console.log('Signing up with:', userData);
        //         name.current.value = '';
        //         email.current.value = '';
        //         password.current.value = '';
        //         // add your signup logic here
        //     }
        // }

        setFormErrors({});
        const nameVal = name.current?.value?.trim();
        const emailVal = email.current.value.trim();
        const passwordVal = password.current.value.trim();

        try {
            if (isSignInForm) {
                // 🔐 Login
                const userCredential = await signInWithEmailAndPassword(auth, emailVal, passwordVal);
                console.log(userCredential)
                console.log("Logged in:", userCredential.user);
            } else {
                // 🆕 Signup
                const userCredential = await createUserWithEmailAndPassword(auth, emailVal, passwordVal);

                // 🧑 Set display name
                await updateProfile(userCredential.user, {
                    displayName: nameVal
                });

                console.log("Signed up with name:", userCredential.user.displayName);
                console.log(userCredential)
            }

            // ✅ Clear form fields
            if (!isSignInForm && name.current) name.current.value = '';
            email.current.value = '';
            password.current.value = '';

        } catch (err) {
            console.error("Firebase Auth Error:", err.message);
            // setFormErrors({ general: err.message });
            setFormErrors({ general: "invalid email or password" });
            // email.current.value = '';
            // password.current.value = '';
        }




    }

    return (
        <Box sx={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <Header />

            {/* background image of netflix */}
            <Box
                component="img"
                src="https://assets.nflxext.com/ffe/siteui/vlv3/69bec183-9cc8-49d4-8fc2-08228d3c91b4/web/DE-en-20250414-TRIFECTA-perspective_92261833-e69a-4a1a-bffd-453270cdbe8f_small.jpg"
                alt="background"
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: -1,
                }}
            />
            <Box

            />

            {/* Form in center */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.70)',
                    padding: 4,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    zIndex: 1,
                }}
            >
                <form onSubmit={handleButtonclick}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "64px",
                        height: isSignInForm ? "550px" : "600px", // ✅ Correct way
                        width: "400px"
                    }}
                >
                    <Typography variant='h3' color='red'>
                        {isSignInForm ? "Sign in" : "Sign up"}
                    </Typography>

                    {/* {!isSignInForm && (
                        <input type="text" placeholder="Enter your name..." style={inputStyle} ref={name} />
                    )} */}
                    {
                        !isSignInForm && (<NetflixTextField type='text' inputRef={name} placeholder='Enter your Name' label='name' fullWidth required error={!!formErrors.name}
                            helperText={formErrors.name || ''} />)
                    }

                    {/* <input type="email" placeholder="Email address" style={inputStyle} ref={email}/> */}

                    <NetflixTextField
                        placeholder='Enter your email'
                        inputRef={email}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        error={!!formErrors.email}
                        helperText={formErrors.email || ''}
                    />
                    {/* <input type="password" placeholder="Password" style={inputStyle} ref={password} />
                     */}

                    <NetflixTextField
                        placeholder='Enter your password'
                        inputRef={password}
                        label="Password"
                        variant="outlined"
                        // type={showPassword ? "text" : "password"}
                        fullWidth
                        required

                        error={!!formErrors.password}
                        helperText={formErrors.password || ''}
                    />

                    {/* <Button type='submit' style={inputStyleSignin} onClick={handleButtonclick}>{isSignInForm ? "Sign In" : "Sign up"}</Button> */}
                    <Button type='submit' variant="contained" color='error' size='large' fullWidth>{isSignInForm ? "Sign In" : "Sign up"}</Button>
                    
                    {formErrors.general && <Box component={"p"} sx={{ color: 'red', cursor: "pointer" }} >
                        {formErrors.general}
                    </Box>}


                    <Box
                        component="p"
                        sx={{ color: 'blue', cursor: "pointer" }}
                        onClick={toggleSignInForm}
                    >
                        {isSignInForm ? "New to Netflix? Sign up now." : "Already a registered user.."}
                    </Box>
                    
                </form>
            </Box>
        </Box>
    )
}

// Simple input styling
const inputStyle = {
    padding: '12px',
    width: '300px',
    borderRadius: '4px',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
}

const inputStyleSignin = {
    padding: '8px',
    width: '300px',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    backgroundColor: "red",
    color: "white"
};

export default Login
