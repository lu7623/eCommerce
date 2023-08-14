'use client'

import style from '../page.module.css'
import React from 'react'
import { IFormData } from '../page';

interface CountryProps {
  country: string;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

export default function SelectCountry({country, setFormData}: CountryProps) {
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setFormData(prevState => ({
      ...prevState,
      country: event.target.value
    }));
  }
  return (
    <select className={style.input} name="country" form="formRegistr" value={country} onChange={handleCountryChange}>
      <option >Select a country</option>
      <option value="BY">Belarus</option>
      <option value="CZ">Czechia</option>
      <option value="DE">Germany</option>
      <option value="KZ">Kazakhstan</option>
      <option value="RU">Russia</option>
      <option value="ES">Spain</option>
      <option value="US">United States</option>
    </select>
  )
}
