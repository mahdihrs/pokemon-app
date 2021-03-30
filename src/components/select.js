import * as React from 'react';
import { Select } from './styled-shared';

const options = [10, 50, 100, 500, 1000, 1200];

export default function SelectComponent({ handleChange, value }) {
  return (
    <Select onChange={handleChange} name="limit">
      {options.map(option =>
        <option key={option} value={option} selected={option === value}>{option}</option>
      )}
    </Select>
  );
}