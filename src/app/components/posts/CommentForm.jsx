'use client';
import "../../../styles/components/comments.tailwind.css";

export default function CommentForm({ formData, setFormData, handleSubmit }) {
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h3 className="comment-form-title">Leave a Comment</h3>

      <div>
        <label>Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>

      <div>
        <label>Email (optional)</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <div>
        <label>Comment *</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          required
          rows={5}
          className="text-area"
        />
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
}
