import {Link, NavLink} from "react-router-dom"
import logo from '../Assets/logo.png'
import '../Styles/Navbar.css'


export default function Navbar() {
    const isActiveStyle = { textDecoration: "underline" };

    // Utilisation d'un tableau en prévision d'ajout au menu
    const menuItems = [
        { to: "/", label: "Accueil" },
        { to: "/about", label: "A Propos" },
        { to: "/aboute", label: "Contact" },
    ];

    const menuItem = ({ to, label }) => (
        <li key={to}>
            <NavLink to={to} style={({ isActive }) => isActive ? isActiveStyle : undefined }>
                {label}
            </NavLink>
        </li>
    );

    return (
        <div className='navbar'>
            <Link to="/">
                <img src={logo} alt='Logo du site Kasa' />
            </Link>
            <nav>
                <ul>{menuItems.map(menuItem)}</ul>
            </nav>
        </div>
    );
}