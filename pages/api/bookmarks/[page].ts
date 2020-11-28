import type { NextApiRequest, NextApiResponse } from "next";
import { ContentAPI } from "services/contentful";
import type { Bookmark } from "services/contentful.types";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Bookmark[]>,
): Promise<any> => {
  const skip = parseInt(req.query.page as string) * 10;
  const api = new ContentAPI();
  const bookmarks = await api.fetchBookmarks(10, skip);
  res.status(200).json(bookmarks);
};