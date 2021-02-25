function ProductCard (props) {
    return (
        <div className="card">
            <a href="product.html">
                <img className="medium" src={props.product.image} alt={props.product.name}></img>
            </a>
            <div className="card-body">
                <a href="product.html">
                    <h2>{props.product.name}</h2>
                </a>
                <div className="raiting">
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                </div>
                <div className="price">
                    <p>Rs {props.product.price}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard