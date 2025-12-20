import { getCollection } from 'astro:content';

const posts = await getCollection('posts');
console.log("Total posts:", posts.length);
console.log("First post data:", posts[0]?.data);
