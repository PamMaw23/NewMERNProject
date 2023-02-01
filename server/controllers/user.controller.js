const { User } = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


module.exports = {
    getAll:(req, res)=>{
        User.find()
        .then(users=>res.json(users))
        .catch(err=>res.json(err));
        
    },

    register: (req, res) => {
        // console.log(req.body) 
        User.create(req.body)
        .then(user => {
            res
            .cookie("usertoken",
            jwt.sign({ id: user._id }, process.env.FIRST_SECRET_KEY),
            { httpOnly: true }
            )
            
            .json({ msg: "success!", user: user });
            console.log(user._id)
        })
        .catch(err => res.json(err));
        

    }
    ,

    login:async (req, res) => {
        console.log("We are now loggin in.")
        console.log(req.body)
        const user = await User.findOne({ email: req.body.email })
            .then(user => {
                console.log(user)
                if (user == null) {
                    res.status(400).json({ msg: "invalid login attempt" })
                    res.cookie()
                } else {
                    console.log("We are about to bcrypt")
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then(passwordIsValid => {
                            if (passwordIsValid === true) {
                                console.log("THis is about to happen", process.env.FIRST_SECRET_KEY);
                                res
                                    .cookie(
                                        "usertoken",
                                        jwt.sign({ _id: user._id }, process.env.FIRST_SECRET_KEY),
                                        {
                                            httpOnly: true,
                                        }
                                    )
                                    .json({ user: user });
                            
                            } //delete statement when everything works
                            else {
                                console.log("Uhhhhhhhhhhh")
                                res.status(400).json({ msg: "invalid login attempt" })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).json({ msg: "invalid login attempt" })
                        })
                }
            })
            .catch(err => res.status(400).json(err.errors));
    },
    
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
        console.log("logging out")
    }
    
    
}
