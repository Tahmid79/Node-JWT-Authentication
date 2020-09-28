const express = require('express') ;
const jwt = require('jsonwebtoken') ;
const app = express() ;


var secretKey = genKey() ;


function genKey(){
    var ky = Math.random().toString(36).substr(2, 5)  ;
    return ky ;
}



app.get('/api' , (req, res) =>{

    res.json({
        message : 'Welcome to the api'
    })  ;

})  ;




app.post('/api/post',  verifyToken , (req , res) =>{

    jwt.verify(req.token , secretKey , (err ,  authData ) =>{

        if(err){
            res.sendStatus(403) ;
        }else{

            res.json({
                message : 'Post Created' ,
                authData
            });

        }
    } )  ;

})  ;




app.post('/api/login' , (req, res) =>{

    const user = {
        id : 1 ,
        name : 'brad' ,
        email : 'brad@gmail.com'
    }   ;

    jwt.sign({user} , secretKey , (err, token)=>{
        res.json(
            {
                token
            })
    }  )

}) ;



app.get('/api/logout' , ( req , res) =>{
    secretKey = genKey() ;
    res.json({ message : 'Logged Out' }) ;
}) ;


//  Format of token
//  Authorization : Bearer <access_token>


//Verify Token

function verifyToken(req , res , next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'] ;

    //Check if bearer is undefined
    if( typeof bearerHeader !== 'undefined' ){

        //Split at the space
        const bearer = bearerHeader.split(' ') ;

        //Get token from the array
        const bearerToken = bearer[1] ;

        //Set the token
        req.token = bearerToken ;

        next() ;


    } else {
        //Forbidden
        res.sendStatus(403) ;
    }



}


app.listen(3000 , ()=>{
    console.log('Server Connected On Port 3000') ;
})  ;
