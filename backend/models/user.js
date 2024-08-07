import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize.js';

const User = sequelize.define('User', {
    email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  profile_picture: {
    type: DataTypes.STRING,
    allowNull: false,
    
  }
}, {
  timestamps: false
}
);

export default User;
