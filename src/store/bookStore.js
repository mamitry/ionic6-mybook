import { defineStore } from "pinia";
import { DebugLevel, appLog } from "../functions/Logging";

//export type Chapter = { name: string, key: string }
//export type Book = { name: string, key: string }
appLog(DebugLevel.INFO, "[Pinia]", "bookStore initializing ... ");
export const useBookStore = defineStore({
  id: "book",
  state: () => ({
    selectedType: "",
    selectedBook: "",
    selectedBookObj: {},
    selectedChapter: "",
    selectedChapterObj: {},
    currentChildren: [],
    currentParents: [],
  }),
  getters: {
    bookHasChildren: (state) => (state.currentChildren && state.currentChildren.length > 0 ? true : false),
  },
  actions: {
    addChapterToChildList(chapter) {
      this.childChapters.push(chapter);
    },
    removeChapterFromChildList(chapter) {
      const i = this.childChapters.findIndex((s) => s.name === chapter.name);
      if (i > -1) this.childChapters.splice(i, 1);
    },
  },
});

appLog(DebugLevel.INFO, "[Pinia]", "bookStore initialized!");
