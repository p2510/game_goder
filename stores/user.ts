import { defineStore } from "pinia";

export const user = defineStore("user", {
  state: () => {
    return {
      amount: 10000 as number,
    };
  },
  actions: {
    addAmount(val: number) {
      this.$state.amount += val*3;
    },
    removeAmount(val:FormBet[]) {
    val.forEach(item=>{
        this.$state.amount-=item.amount
    })
    },
  },

  persist: true,
});

interface FormBet{
    id:number,
    amount:number
}
