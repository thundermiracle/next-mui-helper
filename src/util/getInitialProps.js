export default async (component, context) => {
  if (typeof component.getInitialProps === 'function') {
    const props = await component.getInitialProps(context);
    return props;
  }
  return {};
};
