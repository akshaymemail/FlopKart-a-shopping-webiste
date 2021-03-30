import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfileAction, userProfileAction } from '../redux/user/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { UPDATE_PROFILE_RESET } from '../redux/user/userTypes'

function ProfileScreen(props) {
    const {signIn:{userInfo}} = useSelector(state => state)
    if(!userInfo){
        props.history.push(`/signin?redirect=${props.location.pathname}`)
    }
    const dispatch = useDispatch()

    // user profile details
    const userProfile = useSelector(state => state.userProfile)
    const {loading, user, success, error} = userProfile

    // input states 
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const updateProfile = useSelector(state => state.updateProfile)
    const {loading : updateLoading, success : updateSuccess, error : updateError} = updateProfile

    useEffect(() => {
        if(success){
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setEmail(user.email)
        }else {
            dispatch(userProfileAction())
        }
    }, [dispatch, success, updateSuccess, user])

    // handle submit action
    function handleSubmit(e) {
        e.preventDefault()
        if(password === confirmPassword){
            dispatch(updateProfileAction({firstName, lastName, email, password}))
        } else {
            alert(`Password didn't match`)
        }
    }

    return loading 
    ? <LoadingBox></LoadingBox>
    : error
    ? <MessageBox variant={'error'}>{error}</MessageBox>
    :(
        <div>
            <h1 style={{textAlign : 'center'}}>User Profile</h1>
            <form className='form' onSubmit={handleSubmit}>
            {updateSuccess && <MessageBox variant={'success'}>Profile updated successfully!</MessageBox>}
            {updateError && <MessageBox variant={'error'}>{updateError}</MessageBox>}
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" value={firstName} name='firstName' id='firstName' onChange={e => setFirstName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" value={lastName} name='lastName' id='lastName' onChange ={e => setLastName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} name='email' id='email' onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" value={confirmPassword}id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit">
                    {updateLoading ? <i className='fa fa-spinner fa-spin button-loading' ></i> : "Update"}
                </button>
            </form>
        </div>
    )
}

export default ProfileScreen
