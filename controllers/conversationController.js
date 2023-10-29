import Conversation from "../models/conversation.js";


// Create Conversation
export async function createConversation(req, res) {
  try {
    const newConversation = await Conversation.create(req.body);
    const { title, pinned } = newConversation;
    return res.status(200).json({ title, pinned });
  } catch (err) {
    console.log("Error:", err);
    return res.status(400).json({
      errors: err?.errors?.map((e) => e.message) || [
        "An error occurred during conversation creation.",
      ],
    });
  }
}

// ConversationsList
export async function getConversations(req, res) {
  try {
    const conversations = await Conversation.findAll({ attributes: ["id", "title", "pinned"] });
    return res.status(200).json(conversations);
  } catch {
    return res.status(404).json(null);
  }
}

// Get Conversation by ID
export async function getConversation(req, res) {
  try {
    const conversation = await Conversation.findByPk(req.params.id);
    const { id, title, pinned } = conversation;
    return res.status(200).json({ id, title, pinned });
  } catch {
    return res.json({ errors: ["Conversation not found"] });
  }
}

// update Conversation by ID
export async function updateConversation(req, res) {
  try {
    const conversation = await Conversation.findByPk(req.params.id);
    if (!conversation) {
      return res.status(400).json({ errors: ["Conversation not found"] });
    }

    const newConversationData = await conversation.update(req.body);
    const { id, title, pinned } = newConversationData;
    return res.status(200).json({ id, title, pinned });
  } catch (err) {
    console.log("Error:", err);
    return res.status(400).json({ errors: err.errors.map((e) => e.message) });
  }
}

// delete Conversation
export async function deleteConversation(req, res) {
  try {
    const conversation = await Conversation.findByPk(req.params.id);
    if (!conversation) {
      return res.status(400).json({ errors: ["Conversation not found"] });
    }
    await conversation.destroy();
    return res.status(200);
  } catch (err) {
    console.log("Error:", err);
    return res.status(400).json({ errors: err.errors.map((e) => e.message) });
  }
}


