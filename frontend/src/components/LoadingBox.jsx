import React from 'react'

function LoadingBox(){
    return (
        <div className='loading'>
            <div>
                <p>Hang On Loading Content...</p><br/>
                <i className="fa fa-spinner fa-spin"></i>
            </div>
        </div>
    )
}

export default LoadingBox