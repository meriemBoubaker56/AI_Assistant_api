import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/index.js'; 

const Message = sequelize.define(
  'Message',
  {
    question: {
      type: DataTypes.STRING,
    },
    response: {
      type: DataTypes.STRING,
    },
    conversationId: {
        type: DataTypes.INTEGER
    }
  },
  {
    timestamps: true, 
  }
);

Message.associate = models => {
    Message.belongsTo(models.Conversation,{
        foreignKey: 'conversationId',
        onDelete: 'CASCADE'
      });
  };

export default Message;




