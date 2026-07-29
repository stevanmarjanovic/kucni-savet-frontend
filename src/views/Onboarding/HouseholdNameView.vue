<script setup lang="ts">

import PlainLayout from "@/layouts/PlainLayout.vue";
import Logo from "@/components/Logo.vue";
import {colors} from "@/constants.ts";

const randomColor = colors[Math.floor(Math.random() * colors.length)];
</script>

<template>
  <PlainLayout>
    <div class="container">
      <div> </div>
      <div class="contents">
        <Logo width="40%" :color="randomColor" class="logo" />
        <h1 class="title">Biraj ime domaćinstva</h1>
        <input type="text" class="household-name-input" :style="{ outlineColor: randomColor }" placeholder="Ime domaćinstva" />
        <button :style="{ backgroundColor: randomColor }" class="enter">Ajmo dalje</button>
      </div>
      <div>
        <p :style="{ color: randomColor }" class="helper-text">Kućni Savet Online</p>
      </div>
    </div>
  </PlainLayout>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

}

.contents {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.logo {
  margin-bottom: 4rem;
}

.title {
  font-size: 6rem;
  text-align: center;
}

.household-name-input {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 2.5rem;
  padding: 1rem 2rem;
  border-radius: 1000px;
  border: none;
  outline-style: solid;
  outline-width: 0.5rem;
  width: 98%;
}

.enter {
  font-size: 2.5rem;
  padding: 1rem 2rem;
  border-radius: 1000px;
  border: none;
  background-color: var(--color-text);
  color: var(--color-background);
  cursor: pointer;
  text-transform: uppercase;
  width: 98%;
}

.helper-text {
  font-size: 2rem;
  text-align: center;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  line-height: 0.8;
  text-transform: uppercase;
}
</style>
