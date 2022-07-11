import React from 'react';
import './Header.css';
import Logo from '../../../Logos/274939658_3291721861059567_5644708098258573433_n.jpg'    

function Header(props) {
    const {children} = props;
     
    return (
        <ul className='Header'>
            <li className='LogoLi'><img className='Logo' src={Logo} alt="Logo"/></li>
            <li className='Title'>Colegio de Psicologos de Trenque Lauquen</li>
            <li className='Children'>{children}</li>
        </ul>
    )
}

export { Header };