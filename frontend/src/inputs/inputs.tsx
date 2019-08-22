import * as React from 'react';
import styled from 'styled-components';

interface RawInputProps {
  error?: boolean;
}

const RawInput = styled.input<RawInputProps>`
  border: 1px solid ${({error}) => error ? "red" : "#cccccc"};
  border-radius: 4px;
  padding: 8px;
`;

const InputLabel = styled.label`
  font-size: 12pt;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 16px;
`;

interface InputProps extends RawInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent) => void;
}

const genericInput = (type: string) => (props: InputProps) => (
  <InputLabel>
    {props.label}
    <RawInput type={type} value={props.value} onChange={props.onChange} />
  </InputLabel>
);

export const TextInput = genericInput("text");

export const PasswordInput = genericInput("password");

export const NumberInput = genericInput("number");