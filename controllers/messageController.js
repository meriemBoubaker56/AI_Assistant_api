import Message from "../models/message.js";


// Create Conversation
export async function createMessage(req, res) {
  try {
    const newMessage = await Message.create(req.body);
    const { question, response, conversationId} = newMessage;
    return res.status(200).json({ question, response, conversationId });
  } catch (err) {
    return res.status(400).json({
      errors: err?.errors?.map((e) => e.message) || [
        "An error occurred during message creation.",
      ],
    });
  }
}

// MessagesList
export async function getMessages(req, res) {
  try {
    const messages = await Message.findAll({ attributes: ["id", "question", "response", "conversationId"] });
    return res.status(200).json(messages);
  } catch {
    return res.status(404).json(null);
  }
}

// Get Message by ID
export async function getMessage(req, res) {
  try {
    const message = await Message.findByPk(req.params.id);
    const { id, question, response, conversationId} = message;
    return res.status(200).json({ id, question, response, conversationId });
  } catch {
    return res.json({ errors: ["Message not found"] });
  }
}


// Get Messages by Conversation ID
export async function getMessageByConv(req, res) {
  try {
    const messages = await Message.findAll({ attributes: ["id", "question", "response", "conversationId"] ,
      where: { conversationId: req.params.id },
    });    
    // Map the messages to extract the necessary data
    const formattedMessages = messages.map((message) => {
      const { id, question, response } = message.dataValues;
      return { id, question, response };
    });
    return res.status(200).json(formattedMessages);
  } catch {
    return res.json({ errors: ["Message not found"] });
  }
}

// update Message by ID
export async function updateMessage(req, res) {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(400).json({ errors: ["Message not found"] });
    }
    const newMessageData = await message.update(req.body);
    const { id, question, response, conversationId } = newMessageData;
    return res.status(200).json({ id, question, response, conversationId });
  } catch (err) {
    console.log("Error:", err);
    return res.status(400).json({ errors: err.errors.map((e) => e.message) });
  }
}

// delete Message
export async function deleteMessage(req, res) {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      return res.status(400).json({ errors: ["Message not found"] });
    }
    await message.destroy();
    return res.status(200);
  } catch (err) {
    console.log("Error:", err);
    return res.status(400).json({ errors: err.errors.map((e) => e.message) });
  }
}


