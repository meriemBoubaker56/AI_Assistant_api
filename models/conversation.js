import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/index.js'; 

const Conversation = sequelize.define(
  'Conversation',
  {
    title: {
      type: DataTypes.STRING,
    },
    pinned: {
      type: DataTypes.BOOLEAN,
      }
  },
  {
    timestamps: true, 
  }
);

Conversation.associate = models => {
    Conversation.hasMany(models.Message,{
        foreignKey: 'ConversationId',
      });
  };

export default Conversation;




