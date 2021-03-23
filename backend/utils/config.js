import jwt from 'jsonwebtoken'
export const generateToken = (user) => {
    const {_id, name, email, isAdmin} = user
    return jwt.sign({
        _id : _id,
        name : name,
        email : email,
        isAdmin : isAdmin,
    }, process.env.JWT_SECRET,{ expiresIn : '30d' })
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization
    if(authorization){
        const token = authorization.slice(7, authorization.length)
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if(!err){
                req.user = decode
                next()
            }else{
                res.status(401).send({message: 'Invilid Token'})
            }
        })
    } else {
        res.status(401).send({message: 'Token Not Found'})
    }
}