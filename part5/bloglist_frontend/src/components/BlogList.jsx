import React from "react";
import { SubHeader } from "./Headers";
import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  console.log(blogs)
  if (blogs.length === 0) {
    return <div>No blogs available.</div>
  }

  console.log('Received blogs:', blogs)
  return (
    <div>
      <SubHeader text={'blogs'} />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList
