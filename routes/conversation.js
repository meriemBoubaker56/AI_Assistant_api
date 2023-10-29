import {
    createConversation,
    getConversations,
    getConversation,
    updateConversation,
    deleteConversation,
  } from '../controllers/conversationController.js';
  import { Router } from 'express';


  const router = new Router();
  
  router.post('/', createConversation);
  router.get('/about', getConversations);
  router.get('/:id', getConversation);
  router.put('/:id', updateConversation );
  router.delete('/:id', deleteConversation);
  
  export default router;
  