<script setup lang="ts">
import {currentUser, login} from '@/api/backend'
import PlainLayout from '@/layouts/PlainLayout.vue'
import router from '@/router'
import {useUserStore} from '@/stores/user'
import type {FacebookLoginResponse} from '@/types/facebookResponse.d'
import {onMounted} from 'vue'
import {colors} from "@/constants.js";
import Logo from "@/components/Logo.vue";

const userStore = useUserStore()

const facebookLogin = async () => {
  const response: FacebookLoginResponse = await new Promise((resolve) => window.FB.login(resolve))

  if (response.authResponse) {
    await login(response.authResponse.accessToken);

    const user = await currentUser()
    console.log("User", user)
    // TODO Implement onboarding
    switch (user.onboardingStep) {
      case "HOUSEHOLD_NAME":
        // TODO This Redirects to screen choosing household name
        break;

      case "PROFILE_PICTURE":
        // TODO This Redirects to screen choosing profile picture
        break;

      default:
        await router.push({ name: 'home' })
        break;
    }
  } else {
  }
}

onMounted(async () => {
  if (userStore.isLoggedIn) {
   await router.push({ name: 'home' })
  }
})

const randomColor = colors[Math.floor(Math.random() * colors.length)];
</script>

<template>
  <PlainLayout>
    <div class="container">
      <div> </div>
      <div class="contents">
        <Logo width="40%" :color="randomColor" class="logo" />
        <h1 class="title">Login with Facebook</h1>
        <button :style="{ backgroundColor: randomColor }" class="enter" @click="facebookLogin()">Continue</button>
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
