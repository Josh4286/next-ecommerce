import nc from "next-connect";
import Customer from "../../../models/Customer";
import db from "../../../utils/db";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const customer = await Customer.findOne({
    email: req.body.email.toLowerCase(),
  });
  await db.disconnect();
  if (customer && bcrypt.compareSync(req.body.password, customer.password)) {
    const token = signToken(customer);
    res.send({
      token,
      _id: customer._id,
      name: customer.name,
      email: customer.email,
    });
  } else {
    res.statusCode(401).send({ message: "Invalid email or password" });
  }
});

export default handler;
