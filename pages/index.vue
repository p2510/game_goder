<template>
  <main class="relative w-full h-screen bg-slate-900">
    <div
      class="absolute top-1/4 lg:top-12 flex justify-center w-full text-white text-xl"
    >
      <span class="bottom-icon">
        <svg
          class="w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M14.79 13H13V4c0-.55-.45-1-1-1s-1 .45-1 1v9H9.21c-.45 0-.67.54-.35.85l2.79 2.79c.2.2.51.2.71 0l2.79-2.79a.5.5 0 0 0-.36-.85zM4 20c0 .55.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1z"
          />
        </svg>
      </span>
    </div>
    <div class="absolute top-1/3 xl:top-1/4 flex gap-y-2 justify-center w-full">
      <NuxtLink
        to="jouer"
        class="bg-yellow-600 hover:scale-105 transition duration-700 ease-in-out font-semibold rounded-lg drop-shadow-xl text-white p-4 sm:py-4 lg:px-10 sm:px-8 text-md sm:text-lg lg:txt-2xl xl:text-3xl 2xl:text-5xl tracking-widest"
      >
        JOUER
      </NuxtLink>
    </div>
    <div
      class="absolute top-1/2 flex flex-col gap-y-4 spacer-y-4 lg:space-y-8 justify-center font-semibold text-center w-full text-white text-2xl lg:txt-3xl xl:text-4xl 2xl:text-6xl tracking-widest"
    >
      <p>BIENVENUE SUR</p>

      <h1 class="text-yellow-600">GODER GAME</h1>
    </div>

    <div class="absolute bottom-0 w-full flex flex-col justify-center">
      <h2 class="text-center text-md md:text-lg text-white font-semibold pb-4">
        Top 5 joueurs
      </h2>
      <ClientOnly>
        <div v-if="!loading" class="flex w-full justify-center">
          <table class="bg-slate-800 bg-opacity-50 w-full md:w-1/2">
            <thead class="bg-slate-800 bg-opacity-50 text-white">
              <th class="text-sm p-2 tracking-wide text-white">Rang</th>
              <th class="text-sm p-2 tracking-wide text-white">Joueurs</th>
              <th class="text-sm p-2 tracking-wide text-white">Pays</th>
              <th class="text-sm p-2 tracking-wide texwhite">Montants</th>
            </thead>
            <tr v-for="(player, index) in topPlalers.data" :key="index">
              <td class="text-center text-white text-opacity-50 text-xs py-2">
                {{ index + 1 }}
              </td>
              <td class="text-center text-white text-opacity-50 text-xs py-2">
                {{ player.name }}
              </td>
              <td class="text-center text-white text-opacity-50 text-xs py-2">
                {{ player.country }}
              </td>
              <td class="text-center text-white text-opacity-50 text-xs py-2">
                {{ player.amount }} F
              </td>
            </tr>
          </table>
        </div>
        <div v-else class="flex w-full justify-center text-white">
          chargement . . .
        </div>
      </ClientOnly>
    </div>
  </main>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { user } from "@/stores/user";
import { countries } from "@/utils/country";

import type { Ref } from "vue";
definePageMeta({
  alias: "/",
});
const User = user();
const { data: topPlalers, pending: loading } = useFetch(
  "https://w75mzcji.directus.app/items/bestplayer?limit=5&sort[]=-amount"
);

onMounted(() => {
  // create user account

  const name: string = "";
  if (!isAuth()) {
    const alert1 = Swal.fire({
      allowOutsideClick: false,
      title: "Informations joueurs",
      input: "text",
      inputLabel: "Nom du joueur  ",
      inputValue: name,
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: "Ok",
      confirmButtonColor: " rgb(202 138 4 )",
      preConfirm: (res) => {
        if (res.length <= 0) {
          Swal.showValidationMessage(
            "Il faut pas m'énerver !! Il faut mettre ton nom"
          );
        } else {
          User.addName(res);
        }
      },
    }).then((res) => {
      const country: string = "Côte d'ivoire";
      const alert2 = Swal.fire({
        allowOutsideClick: false,
        title: "Informations joueurs",
        input: "select",
        inputOptions: countries,
        inputLabel: "pays du joueur  ",
        inputValue: country,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: "Ok",
        confirmButtonColor: " rgb(202 138 4 )",
        preConfirm: (res) => {
          if (res.length <= 0) {
            Swal.showValidationMessage(
              "Toi même ton propre pays tu connais pas ???"
            );
          } else {
            User.addCountry(res);
          }
        },
      });
    });
  }

  // statistic
statisticHome()
});
</script>

<style scoped>
p:first-child {
  animation-name: ZoomX;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  transform: scale(0);
}
h1:last-child {
  animation-name: ZoomX;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 1s;
  transform: scale(0);
}
button {
  animation-name: ShowBtn;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 2s;
  opacity: 0;
}

.bottom-icon {
  transform: translateY(0);
  animation-name: Translate;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  animation-delay: 2s;
}

@keyframes ZoomX {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
@keyframes ShowBtn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes Translate {
  from {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
