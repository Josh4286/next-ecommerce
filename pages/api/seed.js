import nc from "next-connect";
import Product from "../../models/Product";
import Customer from "../../models/Customer";
import db from "../../utils/db";
import data from "../../utils/data";
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await Customer.deleteMany();
  await Customer.insertMany(data.customers);
  await db.disconnect();
  res.send({ message: "seeded successfully" });
});

export default handler;
