import { useState, useEffect, useRef } from 'react';

/**
 * Hook personnalisé pour détecter quand un élément devient visible dans le viewport
 * @param {Object} options - Options pour l'IntersectionObserver
 * @param {boolean} options.enabled - Est-ce que l'observer est actif
 * @param {number} options.threshold - Seuil de visibilité de l'élément (0 à 1)
 * @param {string} options.rootMargin - Marge autour de la racine
 * @returns {[React.RefObject, boolean]} Référence à attacher à l'élément et état d'intersection
 */
function useIntersectionObserver({
  enabled = true,
  threshold = 0.1,
  rootMargin = '0px'
} = {}) {
  // Exercice 4 - Implémenter le hook useIntersectionObserver
  // 1. Créer un état pour suivre l'intersection
  const [isIntersecting, setIsIntersecting] = useState(false);
  // 2. Créer une référence pour l'élément à observer
  const ref = useRef(null);
  // 3. Configurer l'IntersectionObserver dans un useEffect
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [enabled, threshold, rootMargin]);
  // 4. Retourner la référence et l'état d'intersection
  
  return [ref, isIntersecting];
  
}

export default useIntersectionObserver;