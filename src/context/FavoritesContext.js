/**
 * Favorites Context & State Management with AsyncStorage Persistence
 * 
 * Manages global favorite games state across Home, GameDetails, and Favorites screens.
 * Automatically loads and persists favorites to the device's local storage so
 * saved games remain available after app restarts.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage key used for AsyncStorage
const FAVORITES_STORAGE_KEY = '@gamehub_favorites_v1';

// Create Context
const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

  // Load saved favorites from local storage on app mount
  useEffect(() => {
    const loadPersistedFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setFavorites(parsed);
          }
        }
      } catch (error) {
        console.error('Failed to load favorites from storage:', error);
      } finally {
        setIsLoadingFavorites(false);
      }
    };

    loadPersistedFavorites();
  }, []);

  // Save favorites to local storage whenever the favorites state changes
  const saveToStorage = async (updatedList) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedList));
    } catch (error) {
      console.error('Failed to persist favorites to storage:', error);
    }
  };

  /**
   * Check if a specific game is currently in favorites
   * @param {string} gameId
   * @returns {boolean}
   */
  const isFavorite = useCallback(
    (gameId) => {
      return favorites.some((game) => game.id === gameId);
    },
    [favorites]
  );

  /**
   * Toggle favorite state for a given game object (Add if not present, Remove if already favorited)
   * Prevents duplicates and immediately persists to AsyncStorage.
   * @param {Object} game
   */
  const toggleFavorite = useCallback(
    async (game) => {
      if (!game || !game.id) return;

      setFavorites((prev) => {
        const exists = prev.some((item) => item.id === game.id);
        let updated;
        if (exists) {
          // Remove from favorites
          updated = prev.filter((item) => item.id !== game.id);
        } else {
          // Add to favorites (prepending so newest favorite is at the top)
          updated = [game, ...prev];
        }
        saveToStorage(updated);
        return updated;
      });
    },
    []
  );

  /**
   * Remove a game from favorites by ID
   * @param {string} gameId
   */
  const removeFavorite = useCallback(
    async (gameId) => {
      setFavorites((prev) => {
        const updated = prev.filter((item) => item.id !== gameId);
        saveToStorage(updated);
        return updated;
      });
    },
    []
  );

  /**
   * Clear all favorited games
   */
  const clearFavorites = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(FAVORITES_STORAGE_KEY);
      setFavorites([]);
    } catch (error) {
      console.error('Failed to clear favorites storage:', error);
    }
  }, []);

  const value = {
    favorites,
    favoriteCount: favorites.length,
    isLoadingFavorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

/**
 * Custom hook to use the Favorites context
 * Throws an error if used outside a FavoritesProvider for early bug detection.
 */
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
