import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer le stockage local
 * @param {string} key - La clé de stockage local
 * @param {any} initialValue - La valeur initiale si rien n'est trouvé dans localStorage
 * @returns {[any, function]} Valeur stockée et fonction pour la mettre à jour
 */
function useLocalStorage(key, initialValue) {
  // Exercice 2 - Implémenter le hook useLocalStorage
  // 1. Initialiser l'état avec la valeur du localStorage ou la valeur initiale
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  // 2. Mettre à jour localStorage quand la valeur change
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, storedValue]);
  
  // 3. Retourner la valeur et la fonction de mise à jour
  return [storedValue, setStoredValue];
}

export default useLocalStorage;