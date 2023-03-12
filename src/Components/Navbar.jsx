import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// styles & images
import './Navbar.css'
import Logo from '../assets/logo.png'

export default function Navbar() {
    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()

    return (
        <nav className="navbar">
            <ul>
                {!user && (
                    <>
                        <li className="logo">
                            <img src={Logo} alt="dojo logo" />
                            <span>Chapro</span>
                        </li>

                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}

                {user && (
                    <li>
                        {!isPending && <button className="btn" onClick={logout}>Logout</button>}
                        {isPending && <button className="btn" disabled>Logging out...</button>}
                    </li>
                )}
            </ul>
        </nav>
    )
}