import React, {
    useEffect
} from 'react'
import ProductCard from '../components/ProductCard'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../redux/products/productActions';

function HomeScreen() {
    const productList = useSelector(state => state.products)
    const {loading, products, error} = productList
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])
    return ( <div className = "row center" > {
        (loading 
            ? (<LoadingBox></LoadingBox>)
            : error 
            ? (<MessageBox variant={'error'}>{error}</MessageBox>) 
            :products.map((product) =>
                <ProductCard product = {product} key = {product.id} />
        ))} 
        </div>)
}
export default HomeScreen