import { user } from "@/stores/user";
import type {Ref} from 'vue'
export default function (tab:Ref<{id:number,amount:number}[]>): boolean {
  const User = user();
  const initial = 0;
  const sumAmountBet:number = tab.value.reduce(
    (accumalator, current) => accumalator + current.amount,
    initial
  );
  return (User.$state.amount > 0) && (User.$state.amount>=sumAmountBet)  ? true : false;
}
