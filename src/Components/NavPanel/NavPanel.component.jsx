import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavPanel.component.scss';

export const NavPanel = () => (
  <nav className='nav-panel'>
    <NavLink strict to='/' className='nav-panel__link' activeClassName='active'>Галерея</NavLink>
    <NavLink strict to='/about' className='nav-panel__link' activeClassName='active'>О скульпторе</NavLink>
    <NavLink strict to='/contacts' className='nav-panel__link' activeClassName='active'>Контакты</NavLink>
  </nav>
);
