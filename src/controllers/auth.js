// **SUMMARY-CODE**

// import { loginUser, refreshUsersSession, registerUser } from "../services/auth.js";
// import { ONE_DAY } from "../constants/index.js";
// import { logoutUser } from "../services/auth.js";


// export const registerUserController = async (req, res) => {
//     const user = await registerUser(req.body);

//     res.status(201).json({
//         status: 201,
//         message: 'Successfully registered a user!',
//         data: user,
//     });
// };


// export const loginUserController = async (req, res) => {
//     const session = await loginUser(req.body);

//     res.cookie('refreshToken', session.refreshToken, {
//         httpOnly: true,
//         expires: new Date(Date.now() + ONE_DAY),
//     });
//     res.cookie('sessionId', session._id, {
//         httpOnly: true,
//         expires: new Date(Date.now() + ONE_DAY),
//     });

//     res.json({
//         status: 200,
//         message: 'Successfully logged in an user!',
//         data: {
//             accessToken: session.accessToken,
//         },
//     });
// };

// export const logoutUserController = async (req, res) => {
//     if (req.cookies.sessionId) {
//         await logoutUser(req.cookies.sessionId);
//     }

//     res.clearCookie('sessionId');
//     res.clearCookie('refreshToken');

//     res.status(204).send();
// };

// const setupSession = (res, session) => {
//     res.cookie('refreshToken', session.refreshToken, {
//         httpOnly: true,
//         expires: new Date(Date.now() + ONE_DAY),
//     });
//     res.cookie('sessionId', session._id, {
//         httpOnly: true,
//         expires: new Date(Date.now() + ONE_DAY),
//     });
// };

// export const refreshUserSessionController = async (req, res) => {
//     const session = await refreshUsersSession({
//         sessionId: req.cookies.sessionId,
//         refreshToken: req.cookies.refreshToken,
//     });

//     setupSession(res, session);

//     res.json({
//         status: 200,
//         message: 'Successfully refreshed a session!',
//         data: {
//             accessToken: session.accessToken,
//         },
//     });
// };


// **WEBINAR-CODE**

import {
  createUser,
  loginUser,
  logoutUser,
  refreshSession
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
