import bcrypt from 'bcrypt';
import env from '../config/env.js';

export const hashPassword = async (password) =>
  bcrypt.hash(password, env.bcryptSaltRounds);

export const comparePassword = async (candidate, hashed) =>
  bcrypt.compare(candidate, hashed);
