import React, { useContext, useState } from 'react'
import "./Navbar.css"
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
import { Link,useNavigate} from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
const Navbar = () => {
    const [menu, setMenu] = useState("");
    const { getTotalCartItems } = useContext(ShopContext);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
     const userName = localStorage.getItem("userName");
    const handleout = () => {
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("userEmail");
        alert("Logged Out Successfully");
        navigate('/');
        window.location.reload(); 
    }
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt='' />
                <p>SHOPPER</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop{menu === "shop" ? <hr /> : <></>}</Link></li>
                <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men{menu === "mens" ? <hr /> : <></>}</Link></li>
                <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none' }} to='/womens'>Women{menu === "womens" ? <hr /> : <></>}</Link></li>
                <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids{menu === "kids" ? <hr /> : <></>}</Link></li>
            </ul>
            <div className="nav-login-cart">
                {!isLoggedIn ? (
                    <Link to='/signIn'><button>Login</button></Link>
                ) : (
                     <>
                        <span className="username">Hi, {userName}</span>
                        <button className='logout' onClick={handleout}>Logout</button>
                    </>
                )}
                <Link to='/cart'><img src={cart_icon} alt='' /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar
