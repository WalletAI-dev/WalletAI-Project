import { InputHTMLAttributes } from 'react';
import { InputContainer } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return <InputContainer {...props} />;
}