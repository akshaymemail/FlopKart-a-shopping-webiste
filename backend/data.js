import bcrypt from 'bcrypt'
const data = {
    users:[
        {
            name : 'AKSHAY KUMAR SINGH',
            email : 'akshaymemail@gmail.com',
            password : bcrypt.hashSync('akshay', 8),
            isAdmin : true
        },
        {
            name : 'HUNGRY PUSSY',
            email : 'hungrypussy@gmail.com',
            password : bcrypt.hashSync('pussy', 8),
            isAdmin : false
        }
    ],
    products: [
        {
            name : 'Nike Slim Shirt',
            category : 'Shirts',
            image : '/images/p1.jpg',
            price : 345,
            countInStock : 10,
            brand : 'Nike',
            rating : 4.5,
            numReview : 34,
            description : 'Best in class'
        },
        {
            name : 'Two Slim Shirt',
            category : 'Shirts',
            image : '/images/p2.jpg',
            price : 543,
            countInStock : 0,
            brand : 'Nike',
            rating : 5,
            numReview : 49,
            description : 'Best in class'
        },
        {
            name : 'Three Slim Shirt',
            category : 'Shirts',
            image : '/images/p3.jpg',
            price : 643,
            countInStock : 30,
            brand : 'Nike',
            rating : 4.5,
            numReview : 53,
            description : 'Best in class'
        },
        {
            name : 'Nike Slim Pant',
            category : 'Pants',
            image : '/images/p4.jpg',
            price : 982,
            countInStock : 12,
            brand : 'Nike',
            rating : 4.5,
            numReview : 56,
            description : 'Best in class'
        },
        {
            name : 'Two Slim Pants',
            category : 'Pants',
            image : '/images/p5.jpg',
            price : 329,
            countInStock : 18,
            brand : 'Nike',
            rating : 4,
            numReview : 9,
            description : 'Best in class'
        },
        {
            name : 'Three Slim Pants',
            category : 'Pants',
            image : '/images/p6.jpg',
            price : 983,
            countInStock : 25,
            brand : 'Nike',
            rating : 5,
            numReview : 10,
            description : 'Best in class'
        }
    ]
}

export default data