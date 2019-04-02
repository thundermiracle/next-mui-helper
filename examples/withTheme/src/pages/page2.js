import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

import withAll from '../client/hoc/withAll';

const Page2 = () => (
  <div>
    <Button color="primary">Hello World Page2!</Button>
    <div>
      <Link href="/">
        <Button>To Page1</Button>
      </Link>
    </div>
  </div>
);

export default withAll(Page2);
