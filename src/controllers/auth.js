// **WEBINAR-CODE* 5-2

// //00:36
// import { createUser, loginUser, logoutUser, refreshSession } from "../services/auth.js";

// //1:38
// const setupSessionCookies = (res, session) => {
//   res.cookie('sessionId', session._id, {
//     httpOnly: true,
//     expire: 7 * 24 * 60 * 60,
//   });
//   res.cookie('sessionToken', session.refreshToken, {
//     httpOnly: true,
//     expire: 7 * 24 * 60 * 60,
//   });
// };

// export const registerUserController = async (req, res) => {
//   const user = await createUser(req.body);

//   res.json({
//     status: 200,
//     message: 'User is created!',
//     data: { user },
//   });
// };

// //00:52
// export const loginUserController = async (req, res) => {
//   const session = await loginUser(req.body);

//   setupSessionCookies(res, session);

//   res.json({
//     status: 200,
//     message: 'User is logged in!',
//     data: { accessToken: session.accessToken },
//   });
// };


// //1:44
// export const logoutController = async (req, res) => {
//   await logoutUser({
//     sessionId: req.cookies.sessionId,
//     sessionToken: req.cookies.sessionToken,
//   });

//   res.clearCookie('sessionId');
//   res.clearCookie('sessionToken');

//   res.status(204).send();
// };

// // 02-00:18
// export const refreshTokenController = async (req, res) => {
//   const { sessionId, sessionToken } = req.cookies;
//   const session = await refreshSession({ sessionId, sessionToken });

//   setupSessionCookies(res, session);

//   res.json({
//     status: 200,
//     message: 'Token refreshed successfully!',
//     data: { accessToken: session.accessToken },
//   });
// };

// **WEBINAR-CODE* 6


import {
  createUser,
  loginUser,
  logoutUser,
  refreshSession,
  sendResetPassword
} from "../services/auth.js";


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
