'use client';

import { IMyAddress } from '@/service/api/CustomerService';
import style from '../../page.module.css';
import React, { useState } from 'react';

interface CityProps {
  city?: string;
  setFormData: React.Dispatch<React.SetStateAction<IMyAddress>>;
}

const infoInput = {
  pattern: '^([a-zA-Zа-яА-Я]+-?s*)+$',
  textMistake: 'Must contain at least one character and no special characters or numbers',
};

export default function CityValid({ city, setFormData }: CityProps) {
  const [error, setError] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setFormData(
      (prevState): IMyAddress => ({
        ...prevState,
        city: value,
      })
    );
    if (!value) {
      setError('');
      return;
    }
    const regexp = new RegExp(infoInput.pattern);
    if (!regexp.test(value)) {
      setError(infoInput.textMistake);
      return;
    }
    setError('');
  };

  return (
    <>
      {error && <p className={style.errorMessage}>{error}</p>}
      <input
        type="text"
        name="city"
        pattern="^([a-zA-Zа-яА-Я]+-?s*)+$"
        value={city ?? ''}
        onChange={handleInputChange}
        className={style.input}
      />
    </>
  );
}
