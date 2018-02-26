import React from 'react';
import withParts from 'nextjs-mui-helper/mui/withParts';
import Button from 'material-ui/Button';

const Page1 = () => (
  <Button color="primary">
    Hello World
  </Button>
);

export default withParts()(Page1);
