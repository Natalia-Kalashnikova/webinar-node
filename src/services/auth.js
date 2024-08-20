// **SUMMARY-CODE**

// import createHttpError from "http-errors";
// import { UserCollection } from "../db/models/user.js";
// import bcrypt from 'bcrypt';
// import { randomBytes } from 'crypto';
// import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
// import {SessionsCollection} from '../db/models/session.js';

// export const registerUser = async (payload) => {
//     const user = await UserCollection.findOne({ email: payload.email });
//     if (user) throw createHttpError(409, 'Email is use');
//     const encryptedPassword = await bcrypt.hash(payload.password, 10);

//     return await UserCollection.create({
//         ...payload,
//         password: encryptedPassword
//     });
// };


// export const loginUser = async (payload) => {
//     const user = await UserCollection.findOne({ email: payload.email });
//     if (!user) {
//         throw createHttpError(404, `User not found`);
//     }
//     const isEqual = await bcrypt.compare(payload.password, user.password);
//     if (!isEqual) {
//         throw createHttpError(401, 'Unauthorized');
//     }
//     await SessionsCollection.deleteOne({ userId: user._id });

//     const accessToken = randomBytes(30).toString('base64');
//     const refreshToken = randomBytes(30).toString('base64');

//     return await SessionsCollection.create({
//         userId: user._id,
//         accessToken,
//         refreshToken,
//         accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
//         refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
//     });
// };


// export const logoutUser = async (sessionId) => {
//     await SessionsCollection.deleteOne({ _id: sessionId });
// };

// const createSession = () => {
//     const accessToken = randomBytes(30).toString('base64');
//     const refreshToken = randomBytes(30).toString('base64');

//     return {
//         accessToken,
//         refreshToken,
//         accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
//         refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
//     };
// };

// export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
//     const session = await SessionsCollection.findOne({
//         _id: sessionId,
//         refreshToken,
//     });

//     if (!session) {
//         throw createHttpError(401, 'Session not found');
//     }

//     const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);

//     if (isSessionTokenExpired) {
//         throw createHttpError(401, 'Session token expired');
//     }

//     const newSession = createSession();

//     await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

//     return await SessionsCollection.create({
//         userId: session.userId,
//         ...newSession,
//     });
// };

// **WEBINAR-CODE**

import createHttpError from "http-errors";
import { User } from "../db/models/user.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Session } from "../db/models/session.js";


const createSession = () => {
  return {
    accessToken: crypto.randomBytes(40).toString('base64'),
    refreshToken: crypto.randomBytes(40).toString('base64'),
    accessTokenValidUntil: Date.now() + 1000 * 60 * 15, // 15 minutes,
    refreshTokenValidUntil: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days,
  };
};

export const createUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

 const user = await User.findOne({ email: payload.email });


  if (user) {
    throw createHttpError(
      409,
      'User with this email is already present in database!',
    );
  }

  return await User.create({
    ...payload,
    password: hashedPassword,
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const areEqual = await bcrypt.compare(password, user.password);

  if (!areEqual) {
    throw createHttpError(401, 'Unauthorized');
  }
    await Session.deleteOne({ userId: user._id });

  return await Session.create({
    userId: user._id,
    ...createSession(),
      });
};

export const logoutUser = async ({ sessionId, sessionToken }) => {
  return await Session.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};

export const refreshSession = async ({ sessionId, sessionToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token is expired!');
  }

  const user = await User.findById(session.userId);

  if (!user) {
    throw createHttpError(401, 'Session not found!');
  }

  await Session.deleteOne({ _id: sessionId });

  return await Session.create({
    userId: user._id,
    ...createSession(),
  });
 };
