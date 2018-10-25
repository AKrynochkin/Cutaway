import React from 'react';

import './Spinner.component.scss';

export const Spinner = () => (
  <div className='spinner-container'>
    <div className='folding-cube'>
      <div className='cube1 cube' />
      <div className='cube2 cube' />
      <div className='cube4 cube' />
      <div className='cube3 cube' />
    </div>
  </div>
);
