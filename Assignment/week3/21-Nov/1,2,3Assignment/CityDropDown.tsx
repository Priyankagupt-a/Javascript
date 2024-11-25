import React from 'react';

interface CityDropdownProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  cities: string[];
}

const CityDropdown: React.FC<CityDropdownProps> = ({ value, onChange, cities }) => {
  return (
    <select name="city" value={value} onChange={onChange}>
      <option value="" disabled>Select a city</option>
      {cities.map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
};

export default CityDropdown;