import React, {useCallback} from 'react';
// Exercice 3 - Importer useTheme
import { useTheme } from '../context/ThemeContext';

// TODO: Exercice 4 - Importer useIntersectionObserver
import LoadingSpinner from './LoadingSpinner';

/**
 * Composant d'affichage de la liste des posts
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.posts - Liste des posts à afficher
 * @param {boolean} props.loading - Indicateur de chargement
 * @param {boolean} props.hasMore - Indique s'il y a plus de posts à charger
 * @param {Function} props.onLoadMore - Fonction pour charger plus de posts
 * @param {Function} props.onPostClick - Fonction appelée au clic sur un post
 * @param {Function} props.onTagClick - Fonction appelée au clic sur un tag
 * @param {boolean} props.infiniteScroll - Mode de défilement infini activé ou non
 */
function PostList({
  posts = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  onPostClick,
  onTagClick,
  infiniteScroll = true
}) {
  // Exercice 3 - Utiliser le hook useTheme
  const { theme } = useTheme();
  
  // TODO: Exercice 4 - Utiliser useIntersectionObserver pour le défilement infini
  
  // Exercice 3 - Utiliser useCallback pour les gestionnaires d'événements
  const handlePostClick = useCallback((post) => {
    if (onPostClick) {
      onPostClick(post);
    }
  }, [onPostClick]);
  
  const handleTagClick = useCallback((e, tag) => {
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tag);
    }
  }, [onTagClick]);

  // Exercice 1 - Gérer le cas où il n'y a pas de posts
  if (!loading && posts.length === 0) {
    return <div className="alert alert-info">Aucun article trouvé.</div>;
  }
  
  return (
    <div className="post-list">
      {/* Exercice 1 - Afficher la liste des posts */}
      {posts.map(post => (
        <div
          key={post.id}
          className={`card mb-3 ${theme === 'dark' ? 'bg-dark text-light' : ''}`}
          onClick={() => handlePostClick(post)}
          style={{ cursor: 'pointer' }}
        >
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body.substring(0, 100)}...</p>
            <div>
              {post.tags?.map(tag => (
                <span
                  key={tag}
                  className={`badge ${theme === 'dark' ? 'bg-light text-dark' : 'bg-secondary'} me-1`}
                  onClick={(e) => handleTagClick(e, tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      {/* Afficher le spinner de chargement */}
      {loading && <LoadingSpinner />}
      
      {/* TODO: Exercice 4 - Ajouter la référence pour le défilement infini */}
      
      {/* Exercice 1 - Ajouter le bouton "Charger plus" pour le mode non-infini */}
      {!infiniteScroll && hasMore && !loading && (
        <button
          className={`btn btn-${theme === 'dark' ? 'light' : 'primary'} mt-3`}
          onClick={onLoadMore}
        >
          Charger plus
        </button>
      )}
    </div>
  );
}

// Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default React.memo(PostList);