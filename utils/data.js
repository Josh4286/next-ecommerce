import bcrypt from "bcryptjs";
const data = {
  customers: [
    {
      name: "Chami",
      email: "chami@test.com",
      password: bcrypt.hashSync("test"),
    },
    {
      name: "Kieran",
      email: "kieran@test.com",
      password: bcrypt.hashSync("test"),
    },
  ],
  products: [
    {
      name: "Signal Tower",
      slug: "signal-tower",
      category: "Neon",
      image: "/images/neon3.jpg",
      price: 1,
      artist: "Steve Jobs",
      rating: 4.5,
      numReviews: 10,
      countInStock: 0,
      description:
        "Neon artwork that makes you smile :). By Valentin BEAUVAIS from https://unsplash.com/photos/yVUQlyRlJSw",
    },
    {
      name: "Reflective Street",
      slug: "reflective-street",
      category: "Neon",
      image: "/images/neon1.jpg",
      price: 2,
      artist: "Steve Jobs",
      rating: 3.2,
      numReviews: 10,
      countInStock: 10,
      description:
        "Admire the abstract. By Bruno Thethe from https://unsplash.com/photos/Evp4iNF3DHQ",
    },
    {
      name: "Abstract art",
      slug: "abstract-art",
      category: "Neon",
      image: "/images/neon2.jpg",
      price: 1,
      artist: "Bill Gates",
      rating: 4.1,
      numReviews: 10,
      countInStock: 5,
      description:
        "Unravel the mysteries. By Victor Rodriguez from https://unsplash.com/photos/UrfpprfDB0k",
    },
    {
      name: "The Hills and Valleys",
      slug: "the-hills-and-valleys",
      category: "Nature",
      image: "/images/nature1.jpg",
      price: 3,
      artist: "Steve Jobs",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description:
        "The view of the world from above. By Jonny Auh from https://unsplash.com/photos/z99iWocuDt0",
    },
    {
      name: "Starry Night",
      slug: "starry-night",
      category: "Nature",
      image: "/images/nature2.jpg",
      price: 2,
      artist: "Jeff Bezos",
      rating: 1.5,
      numReviews: 10,
      countInStock: 10,
      description:
        "The starry night. By Casey Horner from https://unsplash.com/photos/G2jAOMGGlPE",
    },
    {
      name: "Into the Woods",
      slug: "into-the-woods",
      category: "Nature",
      image: "/images/nature3.jpg",
      price: 1,
      artist: "Mark Zuckerberg",
      rating: 3.5,
      numReviews: 10,
      countInStock: 5,
      description:
        "Journey through the woods. By Pat Whelen from https://unsplash.com/photos/avH0oC_6Q6E",
    },
  ],
};
export default data;
