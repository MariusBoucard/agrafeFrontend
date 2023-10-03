<template>
    <div>HOME MA GL
        <div>
            <draggable class="dragArea list-group w-full" :list="list" @change="log">
      <div
        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
        v-for="element in list"
        :key="element.name"
      >
        {{ element.name }}
      </div>
    </draggable>
  </div>



    </div>
</template>
<script>
  import { VueDraggableNext } from 'vue-draggable-next'
export default {
  components: {
    draggable : VueDraggableNext,
  },
  data() {
    return {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
        // Add your items here
      ],
      enabled: true,
        list: [
          { name: 'John', id: 1 },
          { name: 'Joao', id: 2 },
          { name: 'Jean', id: 3 },
          { name: 'Gerard', id: 4 },
        ],
        dragging: false,
    };
  },
  methods: {
    log(event) {
      // Handle reordering logic if needed
      console.log('Reordered items:', this.list,event);
    },
  },
};
</script>