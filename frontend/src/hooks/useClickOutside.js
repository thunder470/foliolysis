import { useEffect } from 'react';

/**
 * Custom hook to detect clicks outside a referenced element
 */
export function useClickOutside(ref, callback) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        callback(e);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
}

export default useClickOutside;
