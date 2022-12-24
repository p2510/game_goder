import { user } from "@/stores/user";
export default function ():boolean {
  const Player = user();
  if (Player.$state.name.length > 0 && Player.$state.country.length > 0) {
    return true;
  } else {
    return false;
  }
}
