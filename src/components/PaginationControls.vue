<template>
  <nav
    v-if="pageCount > 1"
    class="pagination-container"
    :class="{ compact: isCompact }"
    aria-label="Pagination"
  >
    <button
      class="pagination-button"
      type="button"
      aria-label="Première page"
      @click="goTo(1)"
      :disabled="currentPage <= 1"
    >
      «
    </button>
    <button
      class="pagination-button"
      type="button"
      aria-label="Page précédente"
      @click="goTo(currentPage - 1)"
      :disabled="currentPage <= 1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="pagination-icon" aria-hidden="true">
        <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
      </svg>
    </button>

    <div v-if="isCompact" class="pagination-jump">
      <label class="sr-only" for="pagination-select">Page</label>
      <select
        id="pagination-select"
        class="pagination-select"
        :value="currentPage"
        @change="goTo(Number($event.target.value))"
      >
        <option v-for="page in pageCount" :key="page" :value="page">
          {{ page }}
        </option>
      </select>
      <span class="pagination-total">/ {{ pageCount }}</span>
    </div>

    <div v-else class="pagination-pages">
      <template v-for="(item, index) in visiblePages" :key="`${item}-${index}`">
        <span v-if="item === '…'" class="pagination-ellipsis" aria-hidden="true">…</span>
        <button
          v-else
          class="pagination-page"
          type="button"
          :class="{ active: item === currentPage }"
          :aria-label="`Page ${item}`"
          :aria-current="item === currentPage ? 'page' : undefined"
          @click="goTo(item)"
        >
          {{ item }}
        </button>
      </template>
    </div>

    <button
      class="pagination-button"
      type="button"
      aria-label="Page suivante"
      @click="goTo(currentPage + 1)"
      :disabled="currentPage >= pageCount"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="pagination-icon" aria-hidden="true">
        <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd" />
      </svg>
    </button>
    <button
      class="pagination-button"
      type="button"
      aria-label="Dernière page"
      @click="goTo(pageCount)"
      :disabled="currentPage >= pageCount"
    >
      »
    </button>
  </nav>
</template>

<script>
const COMPACT_MQ = '(max-width: 640px)';

export default {
  name: 'PaginationControls',
  props: {
    currentPage: { type: Number, required: true },
    pageCount: { type: Number, required: true },
  },
  emits: ['update:currentPage'],
  data() {
    return {
      isCompact: false,
      mediaQuery: null,
    };
  },
  computed: {
    visiblePages() {
      const total = this.pageCount;
      const current = this.currentPage;
      if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
      }

      const pages = new Set([1, total, current]);
      for (let i = current - 1; i <= current + 1; i += 1) {
        if (i > 1 && i < total) pages.add(i);
      }
      if (current <= 3) {
        pages.add(2);
        pages.add(3);
        pages.add(4);
      }
      if (current >= total - 2) {
        pages.add(total - 1);
        pages.add(total - 2);
        pages.add(total - 3);
      }

      const sorted = [...pages].sort((a, b) => a - b);
      const result = [];
      for (let i = 0; i < sorted.length; i += 1) {
        if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('…');
        result.push(sorted[i]);
      }
      return result;
    },
  },
  methods: {
    goTo(page) {
      const next = Math.min(this.pageCount, Math.max(1, Number(page) || 1));
      if (next !== this.currentPage) this.$emit('update:currentPage', next);
    },
    syncCompact(event) {
      this.isCompact = event.matches;
    },
  },
  mounted() {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    this.mediaQuery = window.matchMedia(COMPACT_MQ);
    this.isCompact = this.mediaQuery.matches;
    this.mediaQuery.addEventListener('change', this.syncCompact);
  },
  beforeUnmount() {
    this.mediaQuery?.removeEventListener('change', this.syncCompact);
  },
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.4rem;
  margin: 1.5rem 0 0.5rem;
}

.pagination-pages,
.pagination-jump {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin: 0 0.15rem;
}

.pagination-button,
.pagination-page {
  min-width: 44px;
  min-height: 44px;
  padding: 8px 10px;
  background: var(--ink);
  color: #fff;
  border: 1px solid var(--ink);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-size: 0.9rem;
  letter-spacing: 0.02em;
}

.pagination-page {
  background: transparent;
  color: var(--ink);
}

.pagination-page.active {
  background: var(--ink);
  color: #fff;
}

.pagination-button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.pagination-button:not(:disabled):hover,
.pagination-page:not(.active):hover {
  background: #222;
  color: #fff;
  border-color: #222;
}

.pagination-icon {
  width: 22px;
  height: 22px;
}

.pagination-ellipsis {
  min-width: 1.5rem;
  text-align: center;
  color: var(--ink-muted);
  user-select: none;
}

.pagination-select {
  min-width: 4.25rem;
  min-height: 44px;
  padding: 0.45rem 0.55rem;
  border: 1px solid var(--ink);
  background: var(--surface, #f7f4ee);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 1rem;
  appearance: auto;
}

.pagination-total {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--ink-muted);
  white-space: nowrap;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.pagination-container.compact {
  gap: 0.35rem;
  flex-wrap: nowrap;
}

.pagination-container.compact .pagination-button {
  min-width: 42px;
  min-height: 42px;
  flex: 0 0 auto;
}

.pagination-container.compact .pagination-jump {
  flex: 1 1 auto;
  justify-content: center;
  min-width: 0;
  gap: 0.45rem;
}

@media (max-width: 380px) {
  .pagination-container.compact .pagination-button {
    min-width: 38px;
    min-height: 42px;
    padding: 6px;
  }

  .pagination-select {
    min-width: 3.75rem;
    font-size: 0.95rem;
  }
}
</style>
