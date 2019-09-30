import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Counter from '../client/components/Counter';

const Page1 = () => (
  <div>
    <Counter />
    <div>
      <Link href="/page2">
        <Button>To Page2</Button>
      </Link>
    </div>
  </div>
);

export default Page1;
