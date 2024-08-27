import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useAuth() {
  const isAuthenticated = ref(false);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      isAuthenticated.value = await response.json();
    } catch (error) {
      console.error('Error checking authentication:', error);
      isAuthenticated.value = false;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('/api/auth/deauthorize', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      isAuthenticated.value = false;
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    isAuthenticated,
    checkAuth,
    logout,
  };
}
