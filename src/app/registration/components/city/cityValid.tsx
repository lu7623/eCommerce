'use client';

import style from '../../page.module.css';
import { IAddress } from '../../page';
import React, { useState } from 'react';

interface CityProps {
  city: string;
  setFormData: React.Dispatch<React.SetStateAction<IAddress>>;
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
      (prevState): IAddress => ({
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
      <label className={style.labelInput}>
        City:<span className="text-rose-600">*</span>
        {error && <p className={style.errorMessage}>{error}</p>}
        <input
          type="text"
          name="city"
          pattern="^([a-zA-Zа-яА-Я]+-?s*)+$"
          value={city}
          onChange={handleInputChange}
          className={style.input}
        />
      </label>
    </>
  );
}
