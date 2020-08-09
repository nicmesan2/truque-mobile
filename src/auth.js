import * as AuthSession from 'expo-auth-session'
import ENV from '../env'

const toQueryString = (params) =>
  '?' +
  Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

export const getAuthUrl = () => {
  const redirectUrl = AuthSession.getRedirectUrl()
  const params = toQueryString({
    client_id: ENV().auth0ClientId,
    response_type: 'token id_token',
    nonce: 'nonce', // ideally, this will be a random value
    scope: 'openid profile email picture',
    redirect_uri: redirectUrl,
    audience: 'https://dev-lizyo13l.us.auth0.com/api/v2/',
    prompt: 'select_account'
  })

  return `${ENV().auth0Domain}/authorize${params}`
}

export const getLogoutUrl = () => {
  const redirectUrl = AuthSession.getRedirectUrl()

  const params = toQueryString({
    client_id: ENV().auth0ClientId,
    returnTo: redirectUrl
  })

  return `${ENV().auth0Domain}/v2/logout${params}`
}
