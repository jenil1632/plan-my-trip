import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  margin: 1em;
  display: block;
  min-width: 200px;
`;

const Searchbox = ({value, onChange}) => {

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div style={{margin: '1em'}}>
      <Input
        type="text"
        id="destination"
        value={value}
        onChange={handleChange}
        placeholder='Where to?'
      />
    </div>
  );
};

export default Searchbox;