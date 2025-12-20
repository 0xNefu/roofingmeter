import { getCollection } from "astro:content";

async function check() {
  const posts = await getCollection("posts");
  const categories = new Set();
  
  posts.forEach(post => {
    console.log(`Post: ${post.data.title}`);
    console.log(`  Category: ${post.data.category}`);
    console.log(`  Has category? ${!!post.data.category}`);
    if (post.data.category) {
      categories.add(post.data.category);
    }
  });
  
  console.log("\nAll categories found:");
  console.log(Array.from(categories));
}

check();
