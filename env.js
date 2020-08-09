const variables = {
  development: {
    apiUrl: 'http://6e814c51da06.ngrok.io',
    googleApiKey: 'AIzaSyB8wH1j8tJvQ45CWHP0M6o0CQKL1cXy8Rs',
    aws_key: 'AKIATCUMZWTBYAEFNAQV',
    aws_secret_key: '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',
    aws_bucket_name: 'trueque-dev',
    auth0Domain: 'https://dev-lizyo13l.us.auth0.com',
    auth0ClientId: 'pNVKPxObaOYK8ENSNeLTNIjnaSNVYzui'
  },
  production: {
    apiUrl: 'http://6e814c51da06.ngrok.io',
    googleApiKey: 'AIzaSyB8wH1j8tJvQ45CWHP0M6o0CQKL1cXy8Rs',
    aws_key: 'AKIATCUMZWTBYAEFNAQV',
    aws_secret_key: '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',
    aws_bucket_name: 'trueque-dev',
    auth0Domain: 'https://dev-lizyo13l.us.auth0.com',
    auth0ClientId: 'pNVKPxObaOYK8ENSNeLTNIjnaSNVYzui'
  }
};

const getEnvVariables = () => {
  if (__DEV__) {
    return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables;
