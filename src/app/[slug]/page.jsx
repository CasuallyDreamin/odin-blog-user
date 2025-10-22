'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import api from '../../lib/api'

export default function PostPage() {
  const { slug } = useParams()
  const router = useRouter()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 🧩 Fetch posts and match by slug
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await api.get('/posts')
        // ✅ Fix: your backend returns { posts: [...] }
        const posts = res.data.posts || []

        const matched = posts.find(
          (p) => slugify(p.title) === slug || p.slug === slug
        )

        if (!matched) {
          console.warn('Post not found for slug:', slug)
          router.push('/')
          return
        }

        setPost(matched)
        setComments(matched.comments || [])
      } catch (err) {
        console.error('Failed to fetch posts:', err)
        setError('Failed to load post. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug, router])

  // 🧠 Handle form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // 💬 Submit comment
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!post?.id) return
    if (!formData.name.trim() || !formData.comment.trim()) return

    try {
      const res = await api.post('/comments', {
        postId: post.id,
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        comment: formData.comment.trim(),
      })

      const newComment = res.data || {
        id: Date.now(),
        author: formData.name,
        body: formData.comment,
        createdAt: new Date().toISOString(),
      }

      setComments([...comments, newComment])
      setFormData({ name: '', email: '', comment: '' })
    } catch (err) {
      console.error('Failed to post comment:', err)
      alert('Could not submit comment. Try again.')
    }
  }

  // 🌀 Loading & Error
  if (loading) return <div className="text-center mt-20">Loading...</div>
  if (error)
    return (
      <div className="text-center mt-20 text-red-600">
        {error}
      </div>
    )

  // ❌ No post found
  if (!post)
    return (
      <div className="text-center mt-20 text-red-600">
        Post not found.
      </div>
    )

  // ✅ Render Post
  return (
    <div className="max-w-3xl mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="text-blue-500 hover:underline mb-4"
      >
        &larr; Back to Home
      </button>

      <article className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          {post.author ? `by ${post.author} • ` : ''}
          {post.createdAt
            ? new Date(post.createdAt).toLocaleDateString()
            : ''}
        </p>

        {/* 🧠 Render your actual layout structure */}
        <div className="prose max-w-none">
          {post.layout?.div?.h1 && <h2>{post.layout.div.h1}</h2>}
          {post.layout?.div?.p && <p>{post.layout.div.p}</p>}
          {post.layout?.ol?.li?.length > 0 && (
            <ol>
              {post.layout.ol.li.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          )}
        </div>
      </article>

      {/* 💬 Comments */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <ul className="space-y-4 mb-6">
            {comments.map((c, i) => (
              <li key={c.id || i} className="bg-gray-100 p-4 rounded-lg">
                <p className="font-semibold">{c.author || c.name}</p>
                <p className="text-sm text-gray-500">
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleString()
                    : c.date
                    ? new Date(c.date).toLocaleString()
                    : ''}
                </p>
                <p className="mt-1">{c.body || c.comment}</p>
              </li>
            ))}
          </ul>
        )}

        {/* ✍️ Comment Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email (optional)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Comment *</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  )
}


function slugify(text) {
  return text
    ?.toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
}
