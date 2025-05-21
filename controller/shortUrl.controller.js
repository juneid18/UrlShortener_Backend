import { getOriginalUrl } from "../dao/shortUrl.js";

export const redirectFromShortUrl = async (req, res) => {
  const { id } = req.params;
  const shortUrl = await getOriginalUrl(id);
  if (shortUrl.error) {
    return res.status(404).json({ error: shortUrl.error });
  }
  res.redirect(shortUrl.originalUrl);
};