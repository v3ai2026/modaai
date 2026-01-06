
import { MemoryNode, User } from "../types";

/**
 * moda AI Studio - Local Persistence Engine
 * Fixed implementation to handle auto-generation of metadata.
 */

const STORAGE_KEYS = {
  MEMORIES: 'MODA_MCP_MEMORIES',
  USER: 'MODA_AUTH_USER',
  API_KEYS: 'MODA_VAULT_KEYS'
};

export const authService = {
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  
  signIn: async (): Promise<User> => {
    const mockUser: User = {
      uid: 'admin-local-001',
      email: 'admin@moda.ai',
      displayName: 'Moda Root',
      photoURL: 'https://ui-avatars.com/api/?name=Moda&background=8ab4f8&color=131314'
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUser));
    return new Promise(resolve => setTimeout(() => resolve(mockUser), 300));
  },
  
  signOut: async (): Promise<void> => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    return new Promise(resolve => setTimeout(resolve, 200));
  },

  onAuthStateChanged: (callback: (user: User | null) => void) => {
    callback(authService.getCurrentUser());
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.USER) {
        callback(authService.getCurrentUser());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }
};

export const memoryService = {
  save: async (node: Omit<MemoryNode, 'id' | 'timestamp'>): Promise<string> => {
    const memories = await memoryService.fetchAll();
    const newId = `mcp_${Date.now()}`;
    const newNode: MemoryNode = { 
      ...node, 
      id: newId, 
      timestamp: new Date().toISOString() 
    };
    memories.unshift(newNode);
    localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories.slice(0, 100)));
    return newId;
  },

  fetchAll: async (max: number = 20): Promise<MemoryNode[]> => {
    const data = localStorage.getItem(STORAGE_KEYS.MEMORIES);
    const memories: MemoryNode[] = data ? JSON.parse(data) : [];
    return memories.slice(0, max);
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEYS.MEMORIES);
  }
};
