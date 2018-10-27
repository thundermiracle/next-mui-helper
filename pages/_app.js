import React from 'react';

import makeNextApp from '../src/nextjs/makeNextApp';

const Layout = (props) => {
  return (
    <div>
      [Layout]
      <div>
        {props.children}
      </div>
    </div>
  );
};

export default makeNextApp(null, Layout);
