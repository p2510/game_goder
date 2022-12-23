<template>
  <main class="relative w-full h-screen bg-slate-900">
    <span
      class="m-8 text-white font-semibold w-full txt-sm xl:text-lg 2xl:text-xl tracking-wide"
      >Jeton : {{ initAmount }} F
    </span>
    <button
      @click="refresh"
      class="absolute top-2 right-2 bg-gray-600 hover:scale-105 transition duration-700 ease-in-out font-semibold rounded-lg drop-shadow-xl text-white p-1 sm:py-2 lg:px-4 sm:px-8 text-xs tracking-widest"
    >
      Actualiser
    </button>
    <h1
      class="absolute top-12 flex justify-center text-white font-semibold text-center w-full text-2xl lg:txt-3xl xl:text-4xl 2xl:text-6xl tracking-widest"
    >
      Début des hostilités
    </h1>

    <div class="absolute top-1/3 flex gap-4 justify-center w-full">
      <button class="cube-container" @click="play">
        <div
          class="cube hover:scale-105 transition duration-500 ease-in-out"
          :class="playStatus ? 'spin' : ''"
        >
          <div
            class="w-20 h-20 flex items-center justify-center side front bg-yellow-600 rounded-lg p-16 xl:p-16 text-slate-700 drop-shadow-xl"
          >
            <Point />
          </div>
          <div
            class="w-20 h-20 flex justify-center items-center gap-4 side back bg-yellow-600 rounded-lg p-16 xl:p-16 text-slate-700 drop-shadow-xl"
          >
            <Point />
            <Point />
          </div>
          <div
            class="w-20 h-20 side right bg-yellow-600 rounded-lg p-16 xl:p-16 text-slate-700 drop-shadow-xl"
          >
            <Point class="absolute top-1/2 left-1/4" />
            <Point class="absolute top-1/2 left-1/2" />
            <Point class="absolute top-1/2 left-3/4" />
          </div>
          <div
            class="w-20 h-20 side left bg-yellow-600 rounded-lg p-16 xl:p-16 text-slate-700 drop-shadow-xl"
          >
            <Point class="absolute top-1/4 left-1/3" />
            <Point class="absolute top-1/4 left-1/2 ml-2" />
            <Point class="absolute top-1/2 left-1/3" />
            <Point class="absolute top-1/2 left-1/2 ml-2" />
          </div>
          <div
            class="w-20 h-20 side top bg-yellow-600 rounded-lg p-16 xl:p-16 text-slate-700 drop-shadow-xl"
          >
            <Point class="absolute top-1/4 left-1/4" />
            <Point class="absolute top-1/4 left-3/4" />
            <Point class="absolute top-1/2 left-1/2" />
            <Point class="absolute top-3/4 left-1/4" />
            <Point class="absolute top-3/4 left-3/4" />
          </div>
          <div
            class="w-20 h-20 side bottom bg-yellow-600 rounded-lg p-16 xl:p-16 text-slate-700 drop-shadow-xl"
          >
            <Point class="absolute top-1/4 left-1/3" />
            <Point class="absolute top-1/4 left-1/2 ml-2" />
            <Point class="absolute top-1/2 left-1/3" />
            <Point class="absolute top-1/2 left-1/2 ml-2" />
            <Point class="absolute top-3/4 left-1/3" />
            <Point class="absolute top-3/4 left-1/2 ml-2" />
          </div>
        </div>
      </button>
    </div>
    <section class="w-full absolute top-1/2 grid grid-cols-8">
      <div
        class="col-start-2 col-end-8 bg-slate-800 bg-opacity-80 rounded-md grid grid-cols-6 gap-6 lg:gap-10 p-4"
      >
        <div
          v-for="(id, index) in 6"
          :key="index"
          @click="bet(id)"
          class="relative col-span-2 py-4 text-lg sm:text-3xl lg:text-6xl text-white bg-white bg-opacity-50 rounded-lg flex justify-center items-center hover:scale-105 cursor-pointer"
        >
          {{ id }}
          <span
            v-if="isAddToTab(id).result"
            class="absolute top-0 left-2 bg-yellow-600 bg-opacity-40 text-white font-semibold p-0 sm:p-2 text-xs"
          >
            {{ isAddToTab(id).amount }} F
          </span>
        </div>
      </div>
    </section>
    <div
      class="absolute bottom-8 flex gap-4 justify-center w-full"
    >
      <button
        @click="play"
        class="bg-yellow-600 hover:scale-105 transition duration-700 ease-in-out font-semibold rounded-lg drop-shadow-xl text-white p-4 sm:py-4 lg:px-10 sm:px-8 text-md sm:text-lg lg:txt-2xl xl:text-3xl 2xl:text-5xl tracking-widest"
      >
        Lancer
      </button>
    </div>
    <div
      class="absolute bottom-2 flex gap-2 justify-start font-semibold text-center w-full text-white text-xs lg:txt-md tracking-wide"
    >
      <NuxtLink to="/" class="underline"> goder game </NuxtLink>
      <a href="https://yatachi-code.org" target="_blank" class="underline">
        par yatachi code
      </a>
    </div>
  </main>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import { user } from "@/stores/user";
import type { Ref } from "vue";
definePageMeta({
  alias: "/jouer",
});
// store

const User = user();
const initAmount: number = User.$state.amount;
// authorize

function authorize(): boolean {
  return User.$state.amount > 0 ? true : false;
}
// start
let playStatus: Ref<boolean> = ref(false);

let play = () => {
  if (authorize()) {
    playStatus.value = true;
    setTimeout(() => {
      function randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      let generateResult: Ref<number> = ref(randomIntFromInterval(1, 6));
      // when user win
      const win = tabBet.value.filter((items) => {
        return items.id === generateResult.value;
      });
      if (win.length == 1) {
        User.addAmount(win[0].amount);
        Swal.fire({
          title: "Gagner !!!",
          text: `Numéro  : ${generateResult.value} `,
          showCancelButton: true,
          showConfirmButton: true,
          color: "green",
          confirmButtonText: "Continuer",
          confirmButtonColor: " rgb(202 138 4 )",
          cancelButtonText: "Fermer",
        }).then((res) => {
          if (res.isConfirmed || res.isDenied || res.isDismissed) {
            refresh();
          }
        });
      } else {
        Swal.fire({
          title: "Perdu ",
          text: `Numéro  : ${generateResult.value} `,
          showCancelButton: true,
          showConfirmButton: true,
          color: "red",
          confirmButtonText: "Réjouer",
          confirmButtonColor: " rgb(202 138 4)",
          cancelButtonText: "Fermer",
        }).then((res) => {
          if (res.isConfirmed || res.isDenied || res.isDismissed) {
            refresh();
          }
        });
      }
      // when user loose
      const loose = tabBet.value.filter((items) => {
        return items.id != generateResult.value;
      });
      if (loose.length >= 1) {
        User.removeAmount(loose);
      }
      playStatus.value = false;
    }, 2000);
  } else {
    Swal.fire({
      title: "Champion ton djai est fini ☻ !!!",
      showCancelButton: true,
      showConfirmButton: true,
      color: "orange",
      confirmButtonText: "Continuer",
      confirmButtonColor: " rgb(202 138 4 )",
      cancelButtonText: "Fermer",
    });
  }
};

// other
const tabBet: Ref<{ id: number; amount: number }[]> = ref([]);

let isAddToTab = (id: number) => {
  const val = tabBet.value.filter((item) => {
    return item.id === id;
  });
  return val.length > 0
    ? { result: true, amount: val[0].amount }
    : { result: false, amount: 0 };
};
// fun

let sendTabBet = (id: number, amount: number) => {
  tabBet.value.push({ id: id, amount: amount });
};
function bet(id: number) {
  const amount: number = 0;
  const response = Swal.fire({
    title: "Votre montant de pari",
    input: "text",
    inputLabel: "Saisir un monant ",
    inputValue: amount,
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "Miser",
    confirmButtonColor: " rgb(202 138 4 )",
    cancelButtonText: "Annuler",
  }).then((res) => {
    if (res.isConfirmed) {
      sendTabBet(id, parseInt(res.value));
    }
  });
}

function refresh() {
  location.reload();
}
</script>

<style scoped>
/* Style the container for the cube */
.cube-container {
  perspective: 1000px;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Style the cube */
.cube {
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
}
.spin {
  animation: spin 2s infinite linear;
  animation-iteration-count: 1;
}

/* Style each side of the cube */
.cube .side {
  position: absolute;
}

/* Position the sides of the cube */
.cube .front {
  transform: translateZ(50px);
}

.cube .back {
  transform: rotateY(180deg) translateZ(50px);
}

.cube .right {
  transform: rotateY(90deg) translateZ(50px);
}

.cube .left {
  transform: rotateY(-90deg) translateZ(50px);
}

.cube .top {
  transform: rotateX(90deg) translateZ(50px);
}

.cube .bottom {
  transform: rotateX(-90deg) translateZ(50px);
}

/* Animate the cube */
@keyframes spin {
  from {
    transform: rotateX(0deg);
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateX(360deg);
  }
  60% {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
</style>
