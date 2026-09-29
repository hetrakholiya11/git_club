import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'gitclub-saved-projects';

export function useSavedProjects() {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // localStorage may be full or unavailable
    }
  }, [savedIds]);

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  }, []);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  );

  const clearAll = useCallback(() => {
    setSavedIds([]);
  }, []);

  return { savedIds, toggleSave, isSaved, clearAll };
}
