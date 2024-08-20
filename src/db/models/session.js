// **SUMMARY-CODE**

// import { model, Schema } from "mongoose";

// const sessionSchema = new Schema(
//     {
//         userId: { type: Schema.Types.ObjectId, ref: 'users' },
//         accessToken: { type: String, required: true },
//         refreshToken: { type: String, required: true },
//         accessTokenValidUntil: { type: Date, required: true },
//         refreshTokenValidUntil: {type: Date, required: true},
//     },
//     {timestamps: true, versionKey: false},
// );


// export const SessionsCollection = model('sessions', sessionSchema);


// **WEBINAR-CODE**
import { Schema, model } from 'mongoose';

const sessionSchema = new Schema(
  {
    refreshToken: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    userId: { type: Schema.ObjectId, required: true, unique: true },
  },
  { timestamps: true, versionKey: false },
);

export const Session = model('sessions', sessionSchema);
