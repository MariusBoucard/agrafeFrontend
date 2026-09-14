<template>
  <div v-if="pageCount > 1" class="pagination-container">
    <button
      class="pagination-button"
      type="button"
      aria-label="Page précédente"
      @click="$emit('update:currentPage', currentPage - 1)"
      :disabled="currentPage <= 1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="pagination-icon">
        <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
      </svg>
    </button>
    <p class="pagination-text">{{ currentPage }} / {{ pageCount }}</p>
    <button
      class="pagination-button"
      type="button"
      aria-label="Page suivante"
      @click="$emit('update:currentPage', currentPage + 1)"
      :disabled="currentPage >= pageCount"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="pagination-icon">
        <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaginationControls',
  props: {
    currentPage: { type: Number, required: true },
    pageCount: { type: Number, required: true },
  },
  emits: ['update:currentPage'],
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0.75rem;
  margin: 1.5rem 0 0.5rem;
}

.pagination-button {
  min-width: 44px;
  min-height: 44px;
  padding: 8px 12px;
  background: var(--ink);
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.pagination-button:not(:disabled):hover {
  background: #222;
}

.pagination-icon {
  width: 22px;
  height: 22px;
}

.pagination-text {
  margin: 0;
  font-family: var(--font-body);
  font-size: 0.9rem;
  letter-spacing: 0.04em;
}
</style>
