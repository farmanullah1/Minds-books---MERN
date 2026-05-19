import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiImage, FiSave, FiX } from 'react-icons/fi';
import api, { uploadFile } from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';
import './Articles.css';

const CreateArticle: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [loading, setLoading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      let coverImage = '';
      if (coverFile) {
        const uploadRes = await uploadFile(coverFile);
        coverImage = uploadRes.url;
      }

      const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t);

      const res = await api.post('/articles', {
        title,
        content,
        coverImage,
        tags
      });

      navigate(`/articles/${res.data._id}`);
    } catch (error) {
      console.error('Failed to create article', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-article-container page-container">
        <div className="card p-4">
          <h2 className="mb-4">Write a New Article</h2>
          
          <form onSubmit={handleSubmit}>
            {coverPreview ? (
              <div className="article-cover-preview mb-4">
                <img src={coverPreview} alt="Cover" />
                <button type="button" className="btn-icon remove-cover" onClick={() => { setCoverPreview(''); setCoverFile(null); }}>
                  <FiX />
                </button>
              </div>
            ) : (
              <div className="cover-upload-prompt mb-4" onClick={() => fileInputRef.current?.click()}>
                <FiImage size={32} className="text-secondary mb-2" />
                <p>Add a cover image</p>
                <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleImageChange} />
              </div>
            )}

            <div className="form-group mb-4">
              <input 
                type="text" 
                className="article-title-input" 
                placeholder="Article Title..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={150}
                required
              />
            </div>

            <div className="form-group mb-4">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Tags (comma separated)... e.g. React, Technology, Life" 
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
              />
            </div>

            <div className="form-group mb-4">
              {/* Fallback to simple textarea for MVP, can integrate ReactQuill or Draft.js later */}
              <textarea 
                className="article-content-input" 
                placeholder="Write your article content here... (Supports Markdown)" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                required
              />
            </div>

            <div className="d-flex justify-between">
              <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading || !title || !content}>
                {loading ? 'Publishing...' : <><FiSave /> Publish Article</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateArticle;
