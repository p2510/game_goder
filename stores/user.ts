import { defineStore } from "pinia";

export const user = defineStore("user", {
  state: () => {
    return {
      name: "" as string,
      country: "" as string,
      amount: 10000 as number,
    };
  },
  actions: {
    addAmount(val: number) {
      this.$state.amount += val * 3;
    },

    removeAmount(val: FormBet[]) {
      val.forEach((item) => {
        this.$state.amount -= item.amount;
      });
    },
    regenerate(val: number) {
      this.$state.amount = val;
    },
    addName(name: string) {
      this.$state.name = name;
    },
    addCountry(country: string) {
      this.$state.country = country;
    },
  },

  persist: true,
});

interface FormBet {
  id: number;
  amount: number;
}
