import Messages from "../model/messages.model.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await Messages.find();

    if (messages.length === 0) {
      return res.status(200).json({
        message: "No messages yet",
        messages: [],
      });
    }

    return res.status(200).json({
      message: "gets successfully",
      messages: messages,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createMessages = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (!name || !message) {
      return res.status(400).json({
        message: "you should write your name and message",
      });
    }

    const newMessage = await Messages.create({
      name,
      email,
      message,
    });

    return res.status(201).json({
      successMessage: "Your message sent to managers",
      newMessage,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};