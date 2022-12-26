import { defineStore } from "pinia";
import { DebugLevel, appLog } from "../functions/Logging";
appLog(DebugLevel.INFO, "[Pinia]", "scrollStore initializing ... !");
export const useScrollStore = defineStore({
  id: "scroll",
  state: () => ({
    YposMenuRight: 0,
    YposMenuMain: 0,
    scrollElementMain: "",
  }),
});
appLog(DebugLevel.INFO, "[Pinia]", "scrollStore initialized!");
