// const jwt = require('jsonwebtoken');
import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieparser from 'cookie-parser';
import {connection} from './database.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();

export {
    express, session, path, cookieparser, connection, bcrypt, nodemailer,
    app, __dirname
};

// module.exports={express, path, session, cookieparser,
//     mysql, nodemailer
// };