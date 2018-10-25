import React from 'react';

import AppRoutes from ':/routes';
import { NavPanel } from '../NavPanel';

import './MainArea.component.scss';

export const MainArea = () => (
  <main className='main-area'>
    <NavPanel />
    <AppRoutes />
  </main>
);
