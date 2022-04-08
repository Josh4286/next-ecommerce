import nc from "next-connect";
import Customer from "../../../models/Customer";
import db from "../../../utils/db";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newCustomer = new Customer({
    name:
      req.body.name[0].toUpperCase() + req.body.name.substring(1).toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: bcrypt.hashSync(req.body.password),
  });
  const customer = await newCustomer.save();
  await db.disconnect();
  const token = signToken(customer);
  res.send({
    token,
    _id: customer._id,
    name: customer.name,
    email: customer.email,
  });
});

export default handler;
