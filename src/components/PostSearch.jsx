import React, { useState, useCallback } from 'react';
// Exercice 3 - Importer useTheme
import { useTheme } from '../context/ThemeContext';

/**
 * Composant de recherche de posts
 * @param {Object} props - Propriétés du composant
 * @param {Function} props.onSearch - Fonction appelée lors de la saisie
 * @param {Function} props.onTagSelect - Fonction appelée lors de la sélection d'un tag
 * @param {Array} props.availableTags - Liste des tags disponibles
 * @param {string} props.selectedTag - Tag actuellement sélectionné
 */
function PostSearch({ 
  onSearch, 
  onTagSelect, 
  availableTags = [], 
  selectedTag = '' 
}) {
  const [searchInput, setSearchInput] = useState('');
  
  // Exercice 3 - Utiliser le hook useTheme
  const { theme } = useTheme();
  
  // Exercice 3 - Utiliser useCallback pour optimiser le gestionnaire
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  }, [onSearch]);
  
  // Exercice 3 - Appliquer les classes CSS en fonction du thème
  const themeClasses = theme === 'dark' ? 'bg-dark text-light' : '';

  return (
    <div className="mb-4">
      <div className="row">
        <div className="col-md-8 mb-3 mb-md-0">
          <div className={`input-group ${themeClasses}`}>
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher des articles..."
              value={searchInput}
              onChange={handleSearchChange}
              aria-label="Rechercher"
            />
            {/* Exercice 1 - Ajouter le bouton pour effacer la recherche */}
            {searchInput && (
              <button
                className={`btn btn-outline-${theme === 'dark' ? 'light' : 'secondary'}`}
                type="button"
                onClick={() => {
                  setSearchInput('');
                  onSearch('');
                }}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </div>
        
        {/* Exercice 4 - Ajouter le sélecteur de tags */}
        <div className="col-md-4">
          <select
            className={`form-select ${themeClasses}`}
            value={selectedTag}
            onChange={(e) => onTagSelect(e.target.value)}
            aria-label="Filtrer par tag"
          >
            <option value="">Tous les tags</option>
            {availableTags.map(tag => (
              <option key={tag.slug} value={tag.slug}>
                {tag.name || tag.slug}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default React.memo(PostSearch);