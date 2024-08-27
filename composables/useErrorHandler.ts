import { ref } from "vue";

export function useErrorHandler() {
  const error = ref(null);

  const handleError = (e: Error) => {
    console.error(e);
    error.value = e.message;
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    error,
    handleError,
    clearError,
  };
}
