import React, { useEffect, useState } from 'react';
import { fetchPosts } from './apiService';
import SignInModal from './SignInModal';
import CircularProgress from '@mui/material/CircularProgress';
import './BlogPage.css';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  likes: number;
}

interface Error {
  message: string;
}

const BlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<Error | null>(null); // Specify the type for error
  const [loading, setLoading] = useState<boolean>(true);
  const [userSignedIn, setUserSignedIn] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        setError({ message: 'Failed to load posts' });
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  const handleLike = (postId: string) => {
    if (!userSignedIn) {
      setCurrentPostId(postId);
      setIsModalOpen(true);
      return;
    }

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, likes: likedPosts.has(postId) ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );

    setLikedPosts(prev => {
      const updated = new Set(prev);
      if (updated.has(postId)) {
        updated.delete(postId);
      } else {
        updated.add(postId);
      }
      return updated;
    });
  };

  const handleSignIn = (profile: any) => {
    if (profile) {
      setUserSignedIn(true);
      setIsModalOpen(false);
      if (currentPostId) {
        handleLike(currentPostId);
        setCurrentPostId(null);
      }
    }
  };

  if (loading) return (
    <div className="loading">
      <CircularProgress />
    </div>
  );

  return (
    <div className="blog-posts">
      {error && <div className="error">{error.message}</div>}
      {posts.map(post => (
        <div key={post.id} className="blog-post">
          <img src={getImageUrl(post.id)} alt={post.title} />
          <div className="content">
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          <div className="footer">
            <small>{new Date(post.created_at).toLocaleString()}</small>
            <button
              className="like-button"
              onClick={() => handleLike(post.id)}
              aria-label={likedPosts.has(post.id) ? "Unlike" : "Like"}
            >
              <img
                src="/images/love-icon.svg"
                alt="Love Icon"
                className={likedPosts.has(post.id) ? "liked" : ""}
              />
              <span className="like-count">{post.likes || 0}</span>
            </button>
          </div>
        </div>
      ))}
      <SignInModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSignIn={handleSignIn} 
      />
    </div>
  );
};

// Helper function to get image URL based on post ID
const getImageUrl = (id: string): string => {
  const imageUrls: { [key: string]: string } = {
    '1': 'images/img-1.jpg',
    '2': 'images/img-2.jpg',
    '3': 'images/img-3.jpg',
    '4': 'images/img-4.jpg',
    '5': 'images/img-5.jpg',
  };

  return imageUrls[id] || 'images/default.jpg';
};

export default BlogPosts;
