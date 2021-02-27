import React, {
    useEffect,
    useState
} from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function HomeScreen() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const {data} = await axios.get('/api/products')
                setLoading(false)
                setProducts(data)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [])
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