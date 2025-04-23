import { Box, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { removeUser, addUser } from '../utils/userSlice';
import { LOGO } from '../utils/constant';

const Header = () => {
  const user = useSelector((store)=> store.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      dispatch(removeUser());
      
    }).catch((error) => {
      console.error("Sign-out error:", error);
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {

            const { uid, email, displayName } = user;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
            navigate('/browse')
            // ...
        } else {
            // User is signed out
            // ...
            dispatch(removeUser());
            navigate('/')
        }
    });

    return ()=> unsubscribe();
}, [])

  return (
    <Box sx={{ position: 'absolute', background: 'linear-gradient(to bottom, transparent, black)',width:"100%", display:"flex",justifyContent:"space-between", alignItems:"center" }}>
      <img
        src={LOGO}
        alt='logo'
        style={{ width: '250px' }}
      />
      {user && (<Button variant="contained" color="error" sx={{mr:4}} onClick={handleSignout}>
        SignOut
      </Button>)}
    </Box>
  )
}

export default Header
