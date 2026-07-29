<script setup lang="ts">
import {logout} from "@/api/backend.ts";
import router from "@/router";

defineProps({
  items: {
    type: Array,
    required: true
  }
})

const defaultHref = { name: 'home' }

const handleLogout = async () => {
  await logout()
  router.push({ name: 'home' })
}
</script>

<template>
<div class="menu">
  <template v-for="item in items" :key="item.label">
    <RouterLink v-if="item.href" class="menu-link" :to="item.href">
      {{ item.label }}
    </RouterLink>
  </template>
  <a class="menu-link" href="#!" @click.prevent="handleLogout()">Logout</a>
</div>
</template>

<style scoped>
.menu {
  position: fixed;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;

  display: flex;
  justify-content: space-between;
  background-color: var(--color-background-secondary);

  border-radius: 1000px;
  padding: var(--card-spacer);

  overflow-x: scroll;
  scrollbar-width: none;
}

.menu::-webkit-scrollbar {
  display: none;
}

.menu-link {
  text-decoration: none;
  text-transform: uppercase;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  color: var(--color-text);

  padding: 1.5rem 2.5rem;
  border-radius: 1000px;
}

.menu-link.router-link-active {
  background-color: var(--color-background)
}
</style>
