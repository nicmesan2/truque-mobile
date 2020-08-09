const variables = {
  development: {
    apiUrl: 'http://6e814c51da06.ngrok.io',
    googleApiKey: 'AIzaSyB8wH1j8tJvQ45CWHP0M6o0CQKL1cXy8Rs'
  },
  production: {
    apiUrl: 'http://6e814c51da06.ngrok.io',
    googleApiKey: 'AIzaSyB8wH1j8tJvQ45CWHP0M6o0CQKL1cXy8Rs'
  }
};

const getEnvVariables = () => {
  if (__DEV__) {
    return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables;
