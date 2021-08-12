import bcrypt from 'bcrypt';

const bcryptPassword = (password: string, salt: number) => {
  return bcrypt.hash(password, salt);
}

const comparePassword = (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
}

export {
  bcryptPassword,
  comparePassword
}