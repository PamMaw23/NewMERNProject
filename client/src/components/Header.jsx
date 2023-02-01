import logoImage from "../images/logo.jpg";
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Header = (props) => {
	const navigate = useNavigate();
	const logoutHandler = (e)=>{
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
        .then(res=>{
            navigate("/login")

        })
        .catch(err=>{console.log(err.response)})

    }

    return(
        <div>
            {/* <img className="logo" src={logoImage} alt="Logo" /> */}
            <nav id="nav2" className="navbar navbar-expand-lg">
						<div className="nav-bar container-fluid">
							<div className="navbar-brand d-flex" >
								<div>
                                    <img className="logo" src={logoImage} alt="Logo" />
								</div>
								<div className="collapse navbar-collapse d-flex" id="navbarNavDropdown">
									<ul className="navbar-nav">
										<li className="nav-welcome">Welcome User!</li>
										<Link className="link" to={"/register"}><li className="nav-signUp">Sign up for free</li></Link>
										<Link className="link" to={"/login"}><li className="nav-signUp">Login</li></Link>
                                        <li className="nav-resources">Resources</li>
									</ul>
									<Link className="link" to={"/"}><button className=" back btn btn-primary" >Back</button></Link>
									<button className="btn btn-primary" onClick={logoutHandler}>Logout</button>
								</div>
						</div>
					</div>
				</nav>
        </div>
    )


}

export default Header;
