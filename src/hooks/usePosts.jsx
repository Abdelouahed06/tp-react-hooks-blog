import { useState, useEffect, useCallback, useMemo } from 'react';
// Exercice 2 - Importer useDebounce
import useDebounce from './useDebounce';

/**
 * Hook personnalisé pour gérer les posts du blog
 * @param {Object} options - Options de configuration
 * @param {string} options.searchTerm - Terme de recherche
 * @param {string} options.tag - Tag à filtrer
 * @param {number} options.limit - Nombre d'éléments par page
 * @param {boolean} options.infinite - Mode de chargement infini vs pagination
 * @returns {Object} État et fonctions pour gérer les posts
 */
function usePosts({ searchTerm = '', tag = '', limit = 10, infinite = true } = {}) {
  // État local pour les posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false); // Changed initial state to false
  const [error, setError] = useState(null);
  
  // Exercice 1 - Ajouter les états nécessaires pour la pagination
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  // TODO: Exercice 4 - Ajouter l'état pour le post sélectionné
  // Note: This is handled in App.js, not here
  
  // Exercice 2 - Utiliser useDebounce pour le terme de recherche
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  // Exercice 3 - Utiliser useCallback pour construire l'URL de l'API
  const buildApiUrl = useCallback((skip = 0) => {
    // Construire l'URL en fonction des filtres
    let url = `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`;
    
    // Exercice 4 - Ajouter le filtrage par tag
    if (tag) {
      url = `https://dummyjson.com/posts/tag/${encodeURIComponent(tag)}?limit=${limit}&skip=${skip}`;
    } else if (debouncedSearchTerm) {
      url = `https://dummyjson.com/posts/search?q=${encodeURIComponent(debouncedSearchTerm)}?limit=${limit}&skip=${skip}`;
    }

    return url;
  }, [debouncedSearchTerm, tag, limit]);
  
  // Exercice 1 - Implémenter la fonction pour charger les posts
  const fetchPosts = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      setError(null);
      const currentSkip = reset ? 0 : skip;
      const url = buildApiUrl(currentSkip);
      const response = await fetch(url);
      const data = await response.json();
      const newPosts = data.posts || [];
      setPosts(prev => (reset ? newPosts : [...prev, ...newPosts]));
      setTotal(data.total);
      setSkip(currentSkip + newPosts.length);
      setHasMore(newPosts.length === limit);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [skip, buildApiUrl]); // Removed loading and hasMore from dependencies
  
  // Exercice 1 - Utiliser useEffect pour charger les posts quand les filtres changent
  // Updated for Exercice 4 to include tag dependency
  useEffect(() => {
    if (loading) return; // Prevent fetching while a fetch is in progress
    setPosts([]);
    setSkip(0);
    setHasMore(true);
    fetchPosts(true);
  }, [debouncedSearchTerm, tag, limit]); // Removed fetchPosts from dependencies
  
  // Exercice 3 - Utiliser useMemo pour calculer les tags uniques
  const uniqueTags = useMemo(() => {
    const tagsSet = new Set();
    posts.forEach(post => {
      post.tags?.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [posts]);
  
  // Exercice 4 - Implémenter la fonction pour charger un post par son ID
  // Note: Not needed since PostDetails fetches the user, and the post is passed directly

  return {
    posts,
    loading,
    error,
    // Retourner les autres états et fonctions
    hasMore,
    fetchPosts,
    uniqueTags, // Exercice 3 - Retourner les tags uniques
  };
}

export default usePosts;