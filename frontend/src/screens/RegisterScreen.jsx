import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { userRegister} from '../redux/user/userActions'
import MessageBox from '../components/MessageBox'

function SignInScreen(props) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    const register = useSelector(state => state.register)
    const {userInfo,loading, error} = register

    function handleSubmit(e) {
        e.preventDefault()
        if(password !== confirmPassword){
            alert("password didn't match")
        }else{
            dispatch(userRegister(firstName,lastName,email, password))
        }
        
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect)
        }
    },[props.history, redirect, userInfo])

    return (
        <div>
            <form className='form' onSubmit={handleSubmit} >
                <div>
                    <h1>Create a new account</h1>
                    {error && <MessageBox variant={'error'}>User already registered</MessageBox>}
                </div>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="firstName" name='firstName' id='firstName' onChange={ e => setFirstName(e.target.value)} placeholder='Enter first name' required />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="lastName" name='lastName' id='lastName' onChange={ e => setLastName(e.target.value)} placeholder='Enter last name' required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='email' onChange={ e => setEmail(e.target.value)} placeholder='Enter email address' required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={ e => setPassword(e.target.value)} placeholder="Enter your password" required />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="confirmPassword" name="confirmPassword" id="confirmPassword" onChange={ e => setConfirmPassword(e.target.value)} placeholder="Enter your password" required />
                </div>
                <div>
                    <button type="submit">{loading ? <i className="fa fa-spinner fa-spin button-loading"></i> :  <i>Create account</i> } </button>
                </div>
                <div>
                    <p>Already have an account? {' '} <Link  to={`login?redirect=${redirect}`} >Sign in!</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignInScreen
