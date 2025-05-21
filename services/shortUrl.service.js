import { SaveShortUrl } from "../dao/shortUrl.js";
import { generateShortId } from "../helper/generateshortUrl.js";

const createShortUrl = async (req, res) => {
  const { url, userId } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  } 

  const shortUrl = generateShortId(6);
  await SaveShortUrl(url, shortUrl, userId);
  // Save the mapping of shortUrl to the original URL in the database
  return res.status(201).json({ shortUrl });
};

const customShortUrl = async (req, res) => {
  const { url, customUrl, userId } = req.body;
  if (!url || !customUrl) {
    return res.status(400).json({ error: "URL and custom URL are required" });
  }

  const shortUrl = customUrl;
  await SaveShortUrl(url, shortUrl, userId);
  // Save the mapping of shortUrl to the original URL in the database
  return res.status(201).json({ shortUrl });
};

export { createShortUrl, customShortUrl };
