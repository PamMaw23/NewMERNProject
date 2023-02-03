import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import homeImage from "../images/gatherly_one.jpg";
import UserContext from "../Context/UserContext";
    
const ViewProfile = () => {
    const [user, setUser] = useState({});
    const storeUser = useContext(UserContext).storeUser

    useEffect(()=>{
        console.log(storeUser);
        setUser(storeUser)
    }, [storeUser])

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/user/${id}`)
    //         .then(res => {setUser(res.data);
    //         console.log(res)})
    //         .catch(err => console.error(err));
    // }, [id]);

    return (
        <div className="viewProfile homePage-container backPage-container ">
            <div>
                <h1 className="viewFont more">My Gatherly Profile</h1>
                <h1 className="viewFont">First Name: {user.firstname}</h1>
                <h1 className="viewFont">Last Name: {user.lastname}</h1>
                <h1 className="viewFont">Email: {user.email}</h1>
            </div>
            <div className=" viewProfile-image">
                <img className=" home-image" src={homeImage} alt="Logo" />
            </div>
        </div>
    )
}
    
export default ViewProfile;