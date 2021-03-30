import React from 'react'
import { useDispatch} from 'react-redux'
import { Link} from 'react-router-dom'
import { logOut } from '../../redux/user/userActions'

function Logout(props) {
   function handleProfile(){
       document.getElementById('profile-card').classList.toggle('active')
   }
   const dispatch = useDispatch()
   function handleSignOut(){
       dispatch(logOut())
   }
    return (
        <>
            <Link onClick={handleProfile} to="#">{props.firstName} <i className='fa fa-caret-down'> </i> </Link>
            <div id="profile-card"> 
                <Link onClick={handleSignOut}>Logout</Link>
                <Link to='/orderhistory'>Order History</Link>
            </div>
        </>
    )
}
export default Logout