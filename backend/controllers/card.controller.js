import { Card } from "../models/card.model.js";

//create card
export const createCard = async (req, res) => {
  const { title, author, category, quote, hashtags } = req.body;
  const background = req.file.filename;

  const card = await Card.create({
    title,
    background,
    author,
    category,
    quote,
    hashtags,
  });
  res.status(201).json({
    message: "Card created successfully",
    card: {
      title: title,
      background: background,
      author: author,
      category: category,
      quote: quote,
      hashtags: hashtags,
    },
  });
  console.log(req.file);
  console.log(req.body);
};

//update card
export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, category, quote, hashtags } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (author) updateData.author = author;
    if (category) updateData.category = category;
    if (quote) updateData.quote = quote;
    if (hashtags) updateData.hashtags = hashtags;
    if (req.file) updateData.background = req.file.filename;

    const card = await Card.findByIdAndUpdate(id, updateData, { new: true });

    if (!card) {
      return res.status(404).json({
        message: "Card not found",
      });
    }

    res.status(200).json({
      message: "Card updated successfully",
      card: card,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating card",
    });
  }
};

//delete card
export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await Card.findByIdAndDelete(id);

    if (!card) {
      return res.status(404).json({
        message: "Card not found",
      });
    }

    res.status(200).json({
      message: "Card deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting card",
    });
  }
};

//get all cards
export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();

    res.status(200).json({
      message: "Cards fetched successfully",
      cards: cards,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching cards",
    });
  }
};

//search cards
export const searchCards = async (req, res) => {
  try {
    const { query } = req.params;

    if (!query) {
      return res.status(400).json({
        message: "Please provide a search query",
      });
    }

    const searchRegex = new RegExp(query, "i");

    const cards = await Card.find({
      $or: [
        { title: searchRegex },
        { author: searchRegex },
        { category: searchRegex },
        { quote: searchRegex },
        { hashtags: { $in: [searchRegex] } },
      ],
    });

    res.status(200).json({
      query: query,
      results: cards.length,
      cards: cards,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error searching cards",
    });
  }
};
