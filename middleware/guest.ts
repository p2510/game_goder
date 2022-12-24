import { user } from "@/stores/user";
export default defineNuxtRouteMiddleware((to, from) => {
  const Player = user();
  if (Player.$state.name.length <= 0 || Player.$state.country.length <= 0) {
   return  navigateTo('/')
  }
});
