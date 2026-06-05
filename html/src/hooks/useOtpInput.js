import { useRef, useCallback } from 'react';

export const useOtpInput = (length = 6) => {
  const inputsRef = useRef([]);

  const handleChange = useCallback((index, value) => {
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }, [length]);

  const handleKeyDown = useCallback((index, e) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }, []);

  const focusFirst = useCallback(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const getValues = useCallback(() => {
    return inputsRef.current.map((el) => el?.value ?? '').join('');
  }, []);

  return { inputsRef, handleChange, handleKeyDown, focusFirst, getValues };
};

export default useOtpInput;
