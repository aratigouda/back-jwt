let Express = require("express")
let app = Express()
let JWT = require("jsonwebtoken")
let CookieParser = require("cookie-parser")

app.use(Express.urlencoded())
app.use(CookieParser())

app.get("/login", function(req, res){
    res.render("login.ejs")
})

app.get("/home", function(req, res){
    res.render("home.ejs")
})

function verifyToken(req, res, next){
    //id there any token available or not
    let fetchedToken = req.cookies.token

    if(!fetchedToken){
        res.redirect("/login")
    } else{
        //server recieved the token
     JWT.verify(fetchedToken, "javascript", function(error){
       if(error){
        res.redirect("/login")
       }else{
        next()
       }
     })
    }
}
app.get("/books", verifyToken, function(req, res){
    res.render("books.ejs")
})
app.get("/mobiles", verifyToken, function(req, res){
    res.render("mobiles.ejs")
})

//if a client is acceesing /mobiles or /books , server should 
//check whether token is coming or not if there is correct
//token then give output, otherwise display login page


app.post("/login", function(req, res){
let enteredUsername = req.body.username
let enteredPassword =req.body.password 
//console.log(enteredUsername, enteredPassword)

//generate token
let jwtToken = JWT.sign( { "name": enteredUsername}, "javascript", { expiresIn: "20s" })
//console.log(jwtToken)
res.cookie("token", jwtToken)


res.redirect("/home")
})




app.listen(3500, function(){
    console.log("server is running on port 3500")
})