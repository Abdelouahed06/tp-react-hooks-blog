import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import PostList from './components/PostList';
import PostSearch from './components/PostSearch';
// Exercice 3 - Importer ThemeToggle
import ThemeToggle from './components/ThemeToggle';
// Exercice 4 - Importer PostDetails
import PostDetails from './components/PostDetails';
// Exercice 3 - Importer ThemeProvider et useTheme
import { ThemeProvider, useTheme } from './context/ThemeContext';
// Exercice 1 - Importer le hook usePosts
import usePosts from './hooks/usePosts';
// Exercice 2 - Importer le hook useLocalStorage
import useLocalStorage from './hooks/useLocalStorage';

function AppContent() {
  // État local pour la recherche
  const [searchTerm, setSearchTerm] = useState('');
  // Exercice 4 - Ajouter l'état pour le tag sélectionné
  const [selectedTag, setSelectedTag] = useState('');
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // Exercice 1 - Utiliser le hook usePosts pour récupérer les posts
  // Exemple: const { posts, loading, error } = usePosts();
  const { posts, loading, error, hasMore, fetchPosts } = usePosts({ searchTerm, tag: selectedTag });

  // Exercice 2 - Utiliser useLocalStorage pour le mode de défilement
  const [infiniteScroll, setInfiniteScroll] = useLocalStorage('infiniteScroll', false);

  // Exercice 3 - Utiliser useCallback pour les gestionnaires d'événements
  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Moved useTheme inside the component
  const { theme } = useTheme();

  // Exercice 4 - Ajouter le gestionnaire pour la sélection de tag
  const handleTagSelect = useCallback((tag) => {
    setSelectedTag(tag); // tag is already a string (tag.slug)
    setSelectedPost(null); // Close PostDetails when filtering
  }, []);

  const handlePostClick = useCallback((post) => {
    setSelectedPost(post);
  }, []);

  const handleTagClick = useCallback((tag) => {
    setSelectedTag(tag); // tag is a string from post.tags
    setSelectedPost(null); // Close PostDetails when filtering
  }, []);

  // Fetch available tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('https://dummyjson.com/posts/tags');
        const tags = await response.json();
        setAvailableTags(tags);
      } catch (error) {
        console.error('Erreur lors du chargement des tags:', error);
      }
    };
    fetchTags();
  }, []);

  return (
    <div className={`min-vh-100 container-fluid ${theme === 'dark' ? 'bg-dark text-light' : ''}`}>
      <header className="pb-3 mb-4 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="display-5 fw-bold">Blog</h1>
          {/* Exercice 3 - Ajouter le ThemeToggle */}
          <ThemeToggle />
        </div>
      </header>

      <main>
        {/* Re-added infiniteScroll toggle for testing */}
        <button
          className="btn btn-secondary mb-3"
          onClick={() => setInfiniteScroll(!infiniteScroll)}
        >
          Mode défilement : {infiniteScroll ? 'Infini' : 'Manuel'}
        </button>

        <PostSearch
          onSearch={handleSearchChange}
          onTagSelect={handleTagSelect}
          availableTags={availableTags}
          selectedTag={selectedTag}
        />

        {/* Exercice 1 - Afficher un message d'erreur si nécessaire */}
        {error && (
          <div className="alert alert-danger">
            Erreur : {error}
          </div>
        )}

        {/* Exercice 4 - Ajouter le composant PostDetails */}
        {selectedPost && (
          <PostDetails
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            onTagClick={handleTagClick}
          />
        )}

        {/* Exercice 1 - Passer les props nécessaires à PostList */}
        <PostList
          posts={posts}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={() => fetchPosts()}
          onPostClick={handlePostClick}
          onTagClick={handleTagClick}
          infiniteScroll={infiniteScroll}
        />
      </main>

      <footer className="pt-3 mt-4 text-center border-top">
        <p>
          TP React Hooks - Blog · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;