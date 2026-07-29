<script setup lang="ts">
import type {Chore} from "@/api/models";
import {computed, type PropType, reactive} from "vue";
import {naturalizeFrequency} from "@/api/enums.ts";
import Tag from "@/components/Tag.vue";
import {colors} from "@/constants.ts";

const props = defineProps({
  chore: {
    type: Object as PropType<Chore>,
    required: true
  }
})
const chore = reactive({ ...props.chore });

const naturalizedLastDone = computed(() => {
  if (!props.chore?.lastDone) return ""

  const lastDone = new Date(chore.lastDone)

  return lastDone.toLocaleString("sr-RS")
})

// TODO Make this not random but stored in database
const randomColor = colors[Math.floor(Math.random() * colors.length)];

const randomAngle = () => Math.floor(Math.random() * 11) - 5;
</script>

<template>
  <div class="chore" :style="{ backgroundColor: randomColor }">
    <div class="chore-header">
      <h3>{{ chore.name }}</h3>
    </div>

    <div class="chore-footer">
      <div class="chore-timeline">
        {{ naturalizedLastDone }}
      </div>

      <div class="chore-actions">
        <Tag :label="naturalizeFrequency(chore.frequency)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.chore {
  padding: 0.8rem;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  cursor: pointer;
  transition-duration: 0.2s;
  outline: var(--card-spacer) solid var(--color-background);
}

.chore:hover {
  transform: scale(1.1);
  rotate: v-bind('randomAngle() + "deg"');
  z-index: 1000;
}

.chore-header h3 {
  font-size: 2rem;
  line-height: 0.8;
  max-width: 90%;
  color: var(--color-black);
}

.chore-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.chore-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
