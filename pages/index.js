import React from 'react';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import lime from '@material-ui/core/colors/lime';
import Link from 'next/link';

import { useThemeManagerContext } from '../src';

const theme2 = {
  palette: {
    primary: red,
    secondary: lime,
  },
};

const Index = () => {
  const { setTheme } = useThemeManagerContext();
  const handleChangeTheme = () => {
    setTheme(theme2, () => {
      console.log('changed to theme2!');
    });
  };

  return (
    <div>
      <Button color="primary">Hello World</Button>
      <Button color="secondary" variant="outlined" onClick={handleChangeTheme}>
        Change Theme
      </Button>
      <Link href="/page1">
        <Button>To Page1</Button>
      </Link>
    </div>
  );
};

export default Index;
