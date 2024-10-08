// **WEBINAR-CODE* 6

import {
  createUser,
  loginOrSignupWithGoogleOAuth,
  loginUser,
  logoutUser,
  refreshSession,
  resetPassword,
  sendResetPassword
} from "../services/auth.js";
import { generateOAuthURL } from "../utils/googleOAuth.js";


const setupSessionCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: 7 * 24 * 60 * 60,
  });
  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expire: 7 * 24 * 60 * 60,
  });
};

export const registerUserController = async (req, res) => {
  const user = await createUser(req.body);

  res.json({
    status: 200,
    message: 'User is created!',
    data: { user },
  });
};


export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'User is logged in!',
    data: { accessToken: session.accessToken },
  });
};


export const logoutController = async (req, res) => {
  await logoutUser({
    sessionId: req.cookies.sessionId,
    sessionToken: req.cookies.sessionToken,
  });

  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');

  res.status(204).send();
};


export const refreshTokenController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;
  const session = await refreshSession({ sessionId, sessionToken });

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Token refreshed successfully!',
    data: { accessToken: session.accessToken },
  });
};

//00:44

export const sendResetPasswordEmailController = async (req, res) => {
  await sendResetPassword(req.body.email);

  res.json({
    status: 200,
    message: 'Reset password email was successfully sent!',
    data: {},
  });
};

//1:25 6-2
export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.json({
    status: 200,
    message: 'Password was successfully reset!',
    data: {},
  });
};

//00:58 7-1
export const getOAuthUrlController = (req, res) => {
  const url = generateOAuthURL();

  res.json({
    status: 200,
    message: 'Successfully received oauth url!',
    data: {
      url,
    },
  });
};

//01:06
export const verifyGoogleOAuthController = async (req, res) => {
  const { code } = req.body;
  const session = await loginOrSignupWithGoogleOAuth(code);

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Logged in with Google OAuth!',
    data: { accessToken: session.accessToken },
  });
};


