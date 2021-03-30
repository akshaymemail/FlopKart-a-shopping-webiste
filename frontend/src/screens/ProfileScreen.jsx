import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userProfileAction } from '../redux/user/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

function ProfileScreen(props) {
    const {signIn:{userInfo}} = useSelector(state => state)
    if(!userInfo){
        props.history.push(`/signin?redirect=${props.location.pathname}`)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userProfileAction())
    }, [dispatch])

    // user profile details
    const userProfile = useSelector(state => state.userProfile)
    const {loading, user, error} = userProfile

    // handle submit action
    function handleSubmit(e) {
        e.preventDefault()
        // TODO ...
    }

    return loading 
    ? <LoadingBox></LoadingBox>
    : error
    ? <MessageBox variant={'error'}>{error}</MessageBox>
    :(
        <div>
            <h1 style={{textAlign : 'center'}}>User Profile</h1>
            <form className='form'>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" value={user.firstName} name='firstName' id='firstName'  />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" value={user.lastName} name='lastName' id='lastName'/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={user.email} name='email' id='email' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password'  />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword"/>
                </div>
                <button type="submit" onClick={handleSubmit} >Update</button>
            </form>
        </div>
    )
}

export default ProfileScreen
