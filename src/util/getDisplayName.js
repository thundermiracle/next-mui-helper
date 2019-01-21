function getDisplayName(WrappedComponent) {
  if (typeof WrappedComponent === 'string') {
    return WrappedComponent;
  }

  if (!WrappedComponent) {
    return null;
  }

  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default getDisplayName;
