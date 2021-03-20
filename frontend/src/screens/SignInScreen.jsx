import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { userSignIn } from '../redux/signin/signinActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

function SignInScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    const signIn = useSelector(state => state.signIn)
    const {userInfo,loading, error} = signIn

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(userSignIn(email, password))
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
                    <h1>Sign In</h1>
                    {error && <MessageBox variant={'error'}>Either username or password is incorrect</MessageBox>}
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
                    <button type="submit">{loading ? <i className="fa fa-spinner fa-spin button-loading"></i> :  <i>Sign In</i> } </button>
                </div>
                <div>
                    <p>New customer? {' '} <Link  to='register' >Create an account!</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignInScreen
