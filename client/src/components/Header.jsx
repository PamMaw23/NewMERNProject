import logoImage from "../images/logo.jpg";
import {Link} from "react-router-dom";

const Header = (props) => {
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
										<li className="nav-signUp">Sign up for free</li>
                                        <li className="nav-resources">Resources</li>
									</ul>
									<Link className="link" to={"/"}><button className=" back btn btn-primary" >Back</button></Link>
									<button  type="submit"  className=" logout btn btn-primary">Logout</button>
								</div>
						</div>
					</div>
				</nav>
        </div>
    )


}

export default Header;
