import Layout from "../components/Layout.jsx";
import ProductCard from "../components/ProductCard";
import Product from "../models/Product.js";
import db from "../utils/db";

export default function Home(props) {
  const { products } = props;
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <div className="home-products">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  // const cookies = context.req.headers.cookie;
  // console.log(JSON.stringify(cookies));
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
