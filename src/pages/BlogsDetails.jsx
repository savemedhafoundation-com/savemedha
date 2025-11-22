import React from 'react'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { FaArrowLeftLong } from "react-icons/fa6";

const BlogsDetails = ({ onNavigate }) => {
    const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `https://nit-backend-a16m.vercel.app/api/content/blog?id=${id}`
        );
        if (!res.ok) throw new Error("Blog not found");
        const data = await res.json();
        console.log("data", data)
        setBlog(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading blog...</p>
      </div>
    );


    if (error || !blog)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-2xl text-red-600 mb-4">Blog not found</p>
        <button
          onClick={() => onNavigate("blogs")}
          className="text-blue-600 hover:underline"
        >
          ← Back to Blogs
        </button>
      </div>
    );


  return (
    <>
      {/* Hero Section */}
      <Navbar currentPage="blogs" onNavigate={onNavigate}/>
      <section className="bg-gradient-to-b from-[#f8f9fa] to-white pt-12 pb-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Back Button */}
          <button
            onClick={() => onNavigate("blogs")}
            className="mb-3 text-lg font-medium text-[#74C425] hover:underline inline-flex items-center gap-2"
          >
            <FaArrowLeftLong />
            Back to All Blogs
          </button>

          {/* Main Title */}
          {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0b2fa1] via-[#1d4ed8] to-[#74C425] leading-tight">
            {blog.title}
          </h1> */}
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-12 prose prose-lg rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-lg">
        {/* Meta Info */}
        {/* <div className="text-center text-gray-600 mb-12 -mt-6">
          <p className="text-sm">
            Published on{" "}
            {new Date(blog.date || Date.now()).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div> */}

        {/* Render Full Content with Green Headings */}
        <div
          className="blog-content text-gray-700 leading-relaxed space-y-8"
          dangerouslySetInnerHTML={{
            __html: (blog.content || blog.excerpt || "")
              // Convert plain text headings to styled ones
              .replace(
                /^([A-Z][A-Za-z\s\?]+)$/gm,
                '<h2 class="text-2xl md:text-3xl font-bold text-[#74C425] mt-12 mb-6">$1</h2>'
              )
              // Style bullet points nicely
              .replace(/^\s*[-•*]\s+/gm, '<span class="inline-block w-8">•</span> ')
              // Ensure proper paragraph spacing
              .replace(/\n\n/g, "</p><p class='mt-6'>")
              .replace(/\n/g, "<br>")
          }}
        />
      </article>

      {/* Optional CTA at Bottom */}
      {/* <section className="bg-gradient-to-r from-[#0b2fa1] to-[#74C425] py-16 mt-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Support Your Body’s Natural Recovery?
          </h3>
          <p className="text-lg mb-8">
            Explore science-backed nutritional solutions at Dantura
          </p>
          <a
            href="https://dantura.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#0b2fa1] font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition shadow-lg"
          >
            Visit Dantura.com
          </a>
        </div>
      </section> */}
    </>
  )
}

export default BlogsDetails