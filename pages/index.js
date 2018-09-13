import React from 'react';
import Button from '@material-ui/core/Button';
import { defaultParts } from '../src/mui/withParts';

const Page1 = () => (
  <Button color="primary">
    Hello World
  </Button>
);

export default defaultParts(Page1);
