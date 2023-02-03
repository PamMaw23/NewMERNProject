
// import homeImage from "../images/gatherly_one.jpg";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from 'react';
import UserContext from "../Context/UserContext";
// import {useNavigate} from 'react-router-dom';



const HomePage= (props)=>{
    const [user, setUser] = useState({});
    const storeUser = useContext(UserContext).storeUser

    useEffect(()=>{
        console.log(storeUser);
    }, [storeUser])
    // const navigate = useNavigate();
    // const logoutHandler = (e)=>{
    //     axios.get('http://localhost:8000/api/logout', {withCredentials:true})
    //     .then(res=>{
    //         navigate("/login")

    //     })
    //     .catch(err=>{console.log(err.response)})

    // }

    return(
        <div className='homePage-container backPage-container '>
            <div className="input-container d-grid gap-2" >
                {/* Adam to work on styling of the pages */}
                <Link className="link" to={"/start/meeting"}><button className="meeting">Start a Meeting</button></Link>
                <Link className="link" to={"/start/meeting"}><button className="meeting">Enter Meeting</button></Link>
                <Link className="link" to={"/register"}><button className="meeting">Create a Profile</button></Link>
                <Link className="link" to={"/view/profile"}><button className="meeting">View Profile</button></Link>
            </div>
            {/* <div>
            <img className="home-image" src={homeImage} alt="Logo" />
            </div> */}
        </div>
    )

}

export default HomePage;