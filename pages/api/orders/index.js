import nc from "next-connect";
import Order from "../../../models/Order";
import db from "../../../utils/db";
import { onError } from "../../../utils/error";
import { isAuth } from "../../../utils/auth";
const handler = nc({ onError });
handler.use(isAuth);

handler.post(async (req, res) => {
  await db.connect();
  const newOrder = new Order({ ...req.body, customer: req.customer._id });
  const order = await newOrder.save();
  await db.disconnect();
  res.status(201).send(order);
});

export default handler;
