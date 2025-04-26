import React, { useMemo, useState, useEffect } from 'react';
// Exercice 3 - Importer useTheme
import { useTheme } from '../context/ThemeContext';

/**
 * Composant d'affichage détaillé d'un post
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.post - Le post à afficher
 * @param {Function} props.onClose - Fonction pour fermer les détails
 * @param {Function} props.onTagClick - Fonction appelée au clic sur un tag
 */
function PostDetails({ post, onClose, onTagClick }) {
  // Exercice 3 - Utiliser le hook useTheme
  const { theme } = useTheme();

  // Exercice 4 - Ajouter les états pour gérer le chargement de l'utilisateur
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);

  // Exercice 4 - Charger les données de l'utilisateur
  useEffect(() => {
    if (!post?.userId) return;

    const fetchUser = async () => {
      setUserLoading(true);
      setUserError(null);
      try {
        const response = await fetch(`https://dummyjson.com/users/${post.userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setUserError('Erreur lors du chargement de l\'utilisateur');
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [post?.userId]);

  // Exercice 3 - Utiliser useMemo pour calculer les classes CSS
  const themeClasses = useMemo(() => ({
    card: theme === 'dark' ? 'bg-dark text-light' : '',
    badge: theme === 'dark' ? 'bg-light text-dark' : 'bg-secondary',
    button: theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'
  }), [theme]);
  
  if (!post) return null;
  
  return (
    <div className={`card mb-4 ${themeClasses.card}`}>
      <div className={`card-header d-flex justify-content-between align-items-center ${themeClasses.card}`}>
        <h5 className="card-title mb-0">{post.title}</h5>
        <button 
          className={`btn btn-sm ${themeClasses.button}`}
          onClick={onClose}
          aria-label="Fermer"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      
      <div className={`card-body ${themeClasses.card}`}>
        {/* Exercice 4 - Afficher le contenu du post */}
        <p className="card-text">{post.body}</p>
        {/* Exercice 4 - Afficher les réactions et l'utilisateur */}
        <div className="mb-3">
          <strong>Réactions :</strong> {post.reactions?.likes || 0} likes, {post.reactions?.dislikes || 0} dislikes
        </div>

        <div className="mb-3">
          <strong>Utilisateur :</strong>{' '}
          {userLoading && <span>Chargement...</span>}
          {userError && <span className="text-danger">{userError}</span>}
          {user && (
            <span>
              {user.firstName} {user.lastName} (@{user.username})
            </span>
          )}
        </div>

        {/* Exercice 4 - Afficher les tags */}
        <div>
          <strong>Tags :</strong>{' '}
          {post.tags?.map(tag => (
            <span
              key={tag}
              className={`badge ${themeClasses.badge} me-1`}
              onClick={() => onTagClick && onTagClick(tag)}
              style={{ cursor: onTagClick ? 'pointer' : 'default' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default React.memo(PostDetails);