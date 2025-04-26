import { useState, useEffect } from 'react';
//  Exercice 2 - Importer useDebounce
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Exercice 1 - Ajouter les états nécessaires pour la pagination
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  // TODO: Exercice 4 - Ajouter l'état pour le post sélectionné
  
  // Exercice 2 - Utiliser useDebounce pour le terme de recherche
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  // TODO: Exercice 3 - Utiliser useCallback pour construire l'URL de l'API
  const buildApiUrl = (skip = 0) => {
    // Construire l'URL en fonction des filtres
    return 'https://dummyjson.com/posts';
  };
  
  // Exercice 1 - Implémenter la fonction pour charger les posts
  const fetchPosts = async (reset = false) => {
    try {
      setLoading(true);
      // Appeler l'API et mettre à jour les états
      const url = searchTerm 
        ? `https://dummyjson.com/posts/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}&skip=${reset ? 0 : skip}`
        : `https://dummyjson.com/posts?limit=${limit}&skip=${reset ? 0 : skip}`;
      const response = await fetch(url);
      const data = await response.json();
      setPosts(prev => reset ? data.posts : [...prev, ...data.posts]);
      setTotal(data.total);
      setSkip(prev => reset ? limit : prev + limit);
      setHasMore(data.posts.length === limit);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Exercice 1 - Utiliser useEffect pour charger les posts quand les filtres changent
  useEffect(() => {
    fetchPosts(true);
  }, [debouncedSearchTerm, limit]);
  
  // TODO: Exercice 4 - Implémenter la fonction pour charger plus de posts
  
  // TODO: Exercice 3 - Utiliser useMemo pour calculer les tags uniques
  
  // TODO: Exercice 4 - Implémenter la fonction pour charger un post par son ID
  
  return {
    posts,
    loading,
    error,
    // Retourner les autres états et fonctions
    hasMore,
    fetchPosts,
  };
}

export default usePosts;