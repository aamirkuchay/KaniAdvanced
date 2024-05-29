import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { useDispatch } from 'react-redux';
import { toggleThemeMode } from '../redux/Slice/ThemeSlice.js';

const useColorMode = () => {
  const dispatch = useDispatch();
  const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    colorMode === 'dark'
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode]);
  dispatch(toggleThemeMode(colorMode));

  return [colorMode, setColorMode];
};

export default useColorMode;
