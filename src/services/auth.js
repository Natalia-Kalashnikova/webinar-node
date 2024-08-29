// **WEBINAR-CODE* 6

import createHttpError from "http-errors";
import { User } from "../db/models/user.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Session } from "../db/models/session.js";
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { ENV_VARS, TEMPLATE_DIR } from '../constants/index.js';
import { sendMail } from "../utils/sendMail.js";
import handlebars from 'handlebars';
import fs from 'node:fs/promises';
import path from 'node:path';
import { validateGoogleOAuthCode } from "../utils/googleOAuth.js";


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


export const logoutUser = async ({ sessionId, sessionToken }) => {
  return await Session.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};

//00:58
export const sendResetPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const token = jwt.sign(
    {
      sub: user.id,
      email,
    },
    env(ENV_VARS.JWT_SECRET),
    {
      expiresIn: '5m',
    },
  );

  // 1:44 6-2
  const templateSource = await fs.readFile(
  path.join(TEMPLATE_DIR, 'send-reset-password-email.html'),

);

const template = handlebars.compile(templateSource.toString());

const html = template({
  name: user.name,
  link: `${env(ENV_VARS.FRONTEND_HOST)}/reset-password?token=${token}`,
});

  try {
    await sendMail({
      html,
      to: email,
      from: env(ENV_VARS.SMTP_FROM),
      subject: 'Reset your password',
    });
  } catch (err) {
    console.log(err);

    throw createHttpError(500, 'Problem with sending emails');
  }
};

export const resetPassword = async ({ token, password }) => {
  let tokenPayload;
  try {
    tokenPayload = jwt.verify(token, env(ENV_VARS.JWT_SECRET));
  } catch (err) {
    throw createHttpError(401, err.message);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    {
      _id: tokenPayload.sub,
      email: tokenPayload.email,
    },
    { password: hashedPassword },
  );
};

//01:26
export const loginOrSignupWithGoogleOAuth = async (code) => {
  const payload = await validateGoogleOAuthCode(code);

  if (!payload) throw createHttpError(401);

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(
      crypto.randomBytes(40).toString('base64'),
      10,
    );

    user = await User.create({
      name: payload.given_name + ' ' + payload.family_name,
      email: payload.email,
      password: hashedPassword,
    });
  }

  await Session.deleteOne({
    userId: user._id,
  });

  return await Session.create({
    userId: user._id,
    ...createSession(),
  });
};
