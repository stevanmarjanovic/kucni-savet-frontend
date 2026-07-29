<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import {getAllChores} from "@/api/backend.ts";
import type {Chore} from "@/api/models";
import {computed, onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user.ts";
import MyChoreSummary from "@/components/MyChoreSummary.vue";
import OthersChoreSummary from "@/components/OthersChoreSummary.vue";
import {colors, imageSrc} from "@/constants.ts";

const user = useUserStore().user;
const chores = ref<Chore[]>([]);

onMounted(async () => {
  chores.value = await getAllChores();
});

const myChores = computed(() => {
  if (user === null)
    return [];
  return chores.value.filter(chore => chore.assignees.some(assignee => assignee.id === user?.id));
})

const othersChores = computed(() => {
  if (user === null)
    return [];

  return chores.value.filter(chore => chore.assignees.length && !chore.assignees.some(assignee => assignee.id === user?.id));
})

const randomColor = colors[Math.floor(Math.random() * colors.length)];
</script>

<template>
  <div>
    <AppLayout>
      <div class="my-profile" :style="{ backgroundColor: randomColor }">
        <img :src="imageSrc(user)" alt="User Image" class="user-image" />
      </div>
      <!-- TODO Ovo prebaciti u zasebnu komponentu eventualno -->
      <div class="title-container">
        <h2 class="title">Danas na meniju</h2>
        <p class="title-description">Ko šta radi, kad i zašto baš ti.</p>
      </div>

      <div class="chore-summary-container">
        <MyChoreSummary class="my-chore-summary" v-for="chore in myChores" :key="chore.id" :chore="chore" />
      </div>

      <div class="title-container">
        <h3 class="title">Ko je sledeći?</h3>
      </div>

      <div class="chore-summary-container">
        <OthersChoreSummary class="other-chore-summary" v-for="chore in othersChores" :key="chore.id" :chore="chore" />
      </div>
    </AppLayout>
  </div>
</template>

<style scoped>
.chore-summary-container {
  display: flex;
  min-width: 100%;
  flex-wrap: wrap;
  gap: var(--card-spacer);
  overflow-x: visible;
}

.my-chore-summary {
  width: calc(50% - var(--card-spacer));
}

.other-chore-summary {
  width: 100%;
}

.title-container {
  margin: 3rem 1rem 1rem;
}

.title-description {
  font-weight: bold;
}

.my-profile {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0.5rem;
}

.my-profile img {
  width: 50px;
}
</style>
