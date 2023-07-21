import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ enter, enterTitle, userData, signOut }) {
    return (<header className="header">
        <img src={logo} className="header__logo" alt="logo" />
        <p className='header__user'>{userData}</p>
        <Link to={enter} onClick={signOut} className='header__enter'>{enterTitle}</Link>
    </header>)
}

export default Header;