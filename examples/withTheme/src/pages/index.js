import React from 'react';
import Button from 'material-ui/Button';

import withAll from '../client/hoc/withAll';

const Page1 = () => (
  <Button color="primary">
    Hello World
  </Button>
);

export default withAll(Page1);
