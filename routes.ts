import { login } from '@/actions/login'


/**
 * An array of routes that accessible for the public
 * these routes do not require authentication 
 * @type {string[]}
 */
export const publicRoutes = [
  "/"
]


/**
 * An array of routes that are used for authentication
 * these routes will redirect logged in user to /settings 
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",

]


/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes 
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"


/**
 * the default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"