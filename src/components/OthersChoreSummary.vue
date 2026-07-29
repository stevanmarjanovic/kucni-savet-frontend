<script setup lang="ts">
import type {Chore, User} from "@/api/models";
import {computed, onMounted, type PropType, reactive, ref} from "vue";
import {naturalizeFrequency} from "@/api/enums.ts";
import {useUserStore} from "@/stores/user.ts";
import {householdUsers, markChoreAsDone, updateChoreAssignees} from "@/api/backend.ts";
import {colors, imageSrc} from "@/constants.ts";

const props = defineProps({
  chore: {
    type: Object as PropType<Chore>,
    required: true
  }
})
const chore = reactive({ ...props.chore });
const user = useUserStore().user;
let users = reactive([] as User[]);

const naturalizedLastDone = computed(() => {
  if (!props.chore?.lastDone) return ""

  const lastDone = new Date(chore.lastDone)

  return lastDone.toLocaleString("sr-RS")
})

const canBeReminded = computed(() => {
  if (!props.chore || chore.assignees.length === 0 || !user) return false;

  if (chore.assignees.length === 1 && chore.assignees.some(assignee => assignee.id === user.id)) return false;

  return true;
})

const editingAssignees = ref(false)
const updateAssignees = (chore: Chore) => {
  editingAssignees.value = false
  updateChoreAssignees(chore.id, chore.assignees)
}

onMounted(async () => {
  users = await householdUsers()
})



// TODO Make this not random but stored in database
const randomColor = colors[Math.floor(Math.random() * colors.length)];
</script>

<template>
  <div class="chore">
    <div class="chore-content">
      <img
        class="chore-image"
        v-if="chore.assignees.length === 1"
        :src="imageSrc(chore.assignees.find(() => true) as User)"
        :alt="chore.assignees.find(() => true)?.name"
        :style="{ backgroundColor: randomColor }"
      >
      <div v-else> <!-- TODO Implament 2x2 smaller avatars for more that 1 assignee, up to 4, house icon if applies to everyone -->
        <img
          v-for="assignee in chore.assignees"
          :key="assignee.id"
          :src="imageSrc(assignee)"
          :alt="assignee.name"
          height="30"
        />
      </div>

      <div class="chore-info">
        <h4>{{ chore.name }}</h4>
        <p>{{ chore.assignees.find(() => true)?.name }} - {{ naturalizeFrequency(chore.frequency) }}</p>
      </div>
    </div>

    <button :style="{ backgroundColor: randomColor }" class="chore-action" v-if="canBeReminded">
      Ajde
    </button>
  </div>
</template>

<style scoped>
.chore {
  padding: calc(var(--card-spacer) * 2);
  border-radius: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  gap: 2rem;
  cursor: pointer;
  transition-duration: 0.2s;
  background-color: var(--color-background-secondary);
}

.chore-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0.5rem;
}

.chore-image {
  border-radius: 1.5rem;
  height: 5rem;
}

.chore-action {
  border: none;
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;

  text-transform: uppercase;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 2rem;

  transition-duration: 0.2s;
}

.chore-action:hover {
  padding: 0.5rem 2rem;
}
</style>
