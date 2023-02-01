
import homeImage from "../images/gatherly_one.jpg";
import {Link} from "react-router-dom";


const HomePage= (props)=>{
    return(
        <div className='homePage-container'>
            <div className="input-container">
                {/* Adam to work on styling of the pages */}
                <Link to={"/start/meeting"}><button className="meeting">Start a Meeting</button></Link>
                <Link to={"/create/profile"}><button className="meeting">Create a Profile</button></Link>
                <Link to={"/view/profile"}><button className="meeting">View Profile</button></Link>
            </div>
            <div>
            <img className="home-image" src={homeImage} alt="Logo" />
            </div>
        </div>
    )

}

export default HomePage;