import { DataTypes, Model } from 'sequelize';
import bcryptjs from 'bcryptjs';
import sequelize from '../database/index.js'; 

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 255],
          msg: 'Name must be between 3 and 255 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email address',
        },
      },
    },
    password_hash: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.VIRTUAL,
      validate: {
        len: {
          args: [6, 50],
          msg: 'Password must be between 6 and 50 characters',
        },
      },
    },
  },
  {
    timestamps: true, 
  }
);

User.addHook('beforeSave', async (user) => {
  if (user.password) {
    user.password_hash = await bcryptjs.hash(user.password, 8);
  }
});

User.prototype.passwordIsValid = function (password) {
  return bcryptjs.compare(password, this.password_hash);
};

export default User;



