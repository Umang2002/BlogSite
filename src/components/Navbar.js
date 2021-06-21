import { Avatar } from '@material-ui/core';
import React, { useState } from 'react'
import { GoogleLogout } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, selectUserData, setInput, setSignedIn, setUserData } from '../fetures/userSlice';
import '../styling/navbar.css'


function Navbar() {
    const [inputValue, setInputValue] = useState("tech")
    const isSignedIn = useSelector(selectSignedIn);
    const userData = useSelector(selectUserData);

    const dispatch = useDispatch()
    const logout = (res) => {
        dispatch(setSignedIn(false))
        dispatch(setUserData(null))
    }

    const handleClick = (e) => {
        e.preventDefault(); 
        dispatch(setInput(inputValue))
    }

    const isSearch = isSignedIn &&
        (<div className="blog__search">
            <input className="search" placehoder="Search the Topic..." value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <button
                className="submit"
                onClick={handleClick}
            >Search
            </button>
        </div>
        )

    const isNavbar = isSignedIn ? <div className="navbar__user__data">
        <Avatar className="user" src={userData?.imageUrl} alt={userData?.name} />
        <h1 className="signedIn">{userData?.givenName}</h1>
        <GoogleLogout
            clientId="11841439627-dcdodi45v5mjeeshsrq1keheu39s6pio.apps.googleusercontent.com"
            render={(renderProps) => (
                <button
                    onClick={renderProps.onClick}
                    className="logout__button"
                    disabled={renderProps.disabled}>
                    Logout😞
                </button>

            )}
            onLogoutSuccess={logout}
        />
    </div> : <h1 className="notSignedIn">User is Not Found!!</h1>



    return (
        <div className="navbar">
            <h1 className="navbar__header">BLOGSITE 📖</h1>

            {isSearch}
            {isNavbar}
        </div>
    )
}

export default Navbar
