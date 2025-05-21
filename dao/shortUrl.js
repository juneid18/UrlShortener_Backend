import shortUrlModel from "../model/shortUrl.model.js";

const SaveShortUrl = async (url, shortUrl, userId) => {
  try {
    if (!url || !shortUrl) {
      return { error: "URL and short URL are required" };
    }

    // Check if the short URL already exists in the database
    const existingUrl = await shortUrlModel.findOne({ shortUrl });
    if (existingUrl) {
      return { error: "Short URL already exists" };
    }

    // Create a new short URL
    const newShortUrl = new shortUrlModel({
      originalUrl: url,
      shortUrl: shortUrl,
      userId: userId,
    });
    await newShortUrl.save();

    return { originalUrl: url, shortUrl: shortUrl };
  } catch (error) {
    console.error("Error creating short URL:", error);
    return { error: "Internal Server Error" };
  }
};

const getOriginalUrl = async (shortUrl) => {
  try {
    const url = await shortUrlModel.findOneAndUpdate(
      { shortUrl },
      { $inc: { clicked: 1 } },
      { new: true }
    );
    if (!url) {
      return { error: "Short URL not found" };
    }
    return url;
  } catch (error) {
    console.error("Error fetching short URL:", error);
    return { error: "Internal Server Error" };
  }
};

export { SaveShortUrl, getOriginalUrl };
