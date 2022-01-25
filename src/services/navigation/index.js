import React from 'react';

export const navigationRef = React.createRef();

export const navigate = (routeName, params) => {
  if (navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.history.push(routeName, params);
  }
};

export const goBack = () => {
  if (navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.history.goBack();
  }
};
