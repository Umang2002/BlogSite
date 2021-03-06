import { render } from '@testing-library/react'
import React from 'react'
import GoogleLogin from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { selectSignedIn, setSignedIn, setUserData } from '../fetures/userSlice'
import '../styling/home.css'

function Homepage() {

 const dispatch = useDispatch();
 const login = (res) => {
     console.log(res);
     
     dispatch(setSignedIn(true))
     dispatch(setUserData(res.profileObj))
 }
 const loginFailed = (res)=> {
     dispatch(setSignedIn(false))
 }

  const isSignedIn = useSelector(selectSignedIn);
    return (
        <div className="home__page" style={{display:isSignedIn?"none":""}}>
          {
              !isSignedIn ?
              <div className="login__message">
                <h2>📚</h2>
                <h1>A Place For getting Ideas !</h1>
                <p>At this place you will get all the Blogs around the topic in which you are intrested!!</p>
                <GoogleLogin
                    clientId="11841439627-dcdodi45v5mjeeshsrq1keheu39s6pio.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            className="login__button">
                            Login with Google
                        </button>
                    
                    )}
                    onSuccess ={login}
                    onFailure={loginFailed}
                    isSignedIn={true}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
            :
            ""
          } 
        </div>
    )
}

export default Homepage
