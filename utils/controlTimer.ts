import timer from "@/stores/timer";
import { user } from "@/stores/user";
export default function () {
  const newUser = user();
  const instanceTimer = timer();
  let time: number = 0;
  let response: number = 0;
  if (newUser.$state.amount === 0) {
    if (instanceTimer.$state.run) {
      const time: number = instanceTimer.$state.start; // Date.now() - 1000 * 60 * 1²
      response = (Date.now() - time) / 60000;
    } else {
      instanceTimer.startTimer()
      instanceTimer.running(true);
    }
  }
  return response;
}
