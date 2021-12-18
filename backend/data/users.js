import bcrypt from 'bcryptjs';
const users = [
  {
    name: 'User Admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456'),
  },
  {
    name: 'Jane Doe',
    email: 'jane@exmple.com',
    password: bcrypt.hashSync('123456'),
  },
];

export default users;
