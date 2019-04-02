import React from 'react';
import PropTypes from 'prop-types';

import makeNextApp from '../src/nextjs/makeNextApp';

const Layout = ({ children, title }) => {
  return (
    <div>
      [Layout] -- {title}
      <div>{children}</div>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string,
};
Layout.defaultProps = {
  title: '',
};

export default makeNextApp(null, Layout);
