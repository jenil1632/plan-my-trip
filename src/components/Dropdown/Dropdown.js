import React, { useState } from 'react';
import styled from 'styled-components';

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  display: block;
  margin: 1em 0 1em;
  min-width: 150px;
`;

const Dropdown = ({ label, options, onChange }) => {
  const [selected, setSelected] = useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
    onChange(event.target.value); // Pass the selected value to parent
  };

  return (
    <div style={{margin:'1em', height: '50%'}}>
      <Select id={label} value={selected} onChange={handleChange}>
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
