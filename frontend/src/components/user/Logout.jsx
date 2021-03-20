import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { logOut } from '../../redux/signin/signinActions'

function Logout(props) {

   function handleProfile(){
       document.getElementById('profile-card').classList.toggle('active')
   }
   const dispatch = useDispatch()
   
   function handleSignOut(){
       dispatch(logOut())
   }

   const signIn = useSelector(state => state.signIn)
   const {userInfo} = signIn

    return (
        <>
            <Link onClick={handleProfile} to="#">{props.firstName} <i className='fa fa-caret-down'> </i> </Link>
            <div id="profile-card"> 
                <Link onClick={handleSignOut}>Logout</Link>
            </div>
        </>
    )
}

export default Logout
