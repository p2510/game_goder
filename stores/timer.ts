import { defineStore } from "pinia";

export default defineStore("timer", {
  state: () => {
    return {
      start: 0 as number,
      run: false as boolean,
    };
  },
  actions: {
    startTimer(): void {
      this.$state.start = Date.now();
    },
    running(bool:boolean): void {
      this.$state.run = bool;
    },
  },
  persist: true,
});
