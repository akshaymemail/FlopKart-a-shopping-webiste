import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { orderHistoryAction } from '../redux/order/orderActions'

function OrderHistoryScreen(props) {
    // redirect user if not signed in 
    const {userInfo} = useSelector(state => state.signIn)
    if(!userInfo){
        props.history.push(`/signin?redirect=${props.location.pathname}`)
    }
    const dispatch = useDispatch()
    // order history
    const  {loading, error,success, order} = useSelector(state => state.orderHistory)

    useEffect( () => {
        dispatch(orderHistoryAction())
    }, [dispatch])
    return loading 
    ? (<LoadingBox></LoadingBox>) 
    : error 
    ? (<MessageBox variant={'error'}>{error}</MessageBox>)
    : success && (
        <div>
            <h1 style={{textAlign : 'center'}}>Order History</h1>
            <div className = 'responsive'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    { order.map(o => 
                    <tr>
                        <td>{o._id}</td>
                        <td>{o.createdAt.substring(0, 10)}</td>
                        <td>{o.totalPrice.toFixed(2)}</td>
                        <td>{o.isPaid ? 'Paid' : 'No'}</td>
                        <td>{o.isDelivered ? 'Yes' : 'No'}</td>
                        <td>
                            <button className='small' onClick={ e => props.history.push(`/orders/${o._id}`)}>
                                Details
                            </button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default OrderHistoryScreen
