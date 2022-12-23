import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectPosition } from '../map/mapSlice';
import styles from './Counter.module.css';

export function Counter() {
  const positionInput = useAppSelector(selectPosition);

  return (
    <div>
        <h1 className='text-white'>{Math.floor(positionInput == 550180.0020261556 ? 0 : positionInput).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')} ₪</h1>
    </div>
  );
}
