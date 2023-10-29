import { Router } from 'express';
import {
    createMessage,
    getMessages,
    getMessage,
    updateMessage,
    deleteMessage,
    getMessageByConv
  } from '../controllers/messageController.js';
  
  const router = new Router();
  
  router.post('/', createMessage);
  router.get('/about', getMessages);
  router.get('/:id', getMessage);
  router.get('/conversation/:id', getMessageByConv);
  router.put('/:id', updateMessage);
  router.delete('/:id', deleteMessage);

  export default router;
  