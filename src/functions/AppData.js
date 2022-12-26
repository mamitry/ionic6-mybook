import { DebugLevel, appLog } from "./Logging";

appLog(DebugLevel.INFO, "[AppData]", "Reading all AppBooks");
console.time("loadAllBooks");
const readBooks = new Map();
const BOOKS = getData(`books.json`);
export const ALL_BOOKS = {
  BOOK1: getData(`book1.json`),
  BOOK11: getData(`book11.json`),
  BOOK12: getData(`book12.json`),
};
// eslint-disable-next-line no-unused-vars
console.timeEnd("loadAllBooks");

/**
 * read json files from disk
 *
 * @param {*} file
 * @returns
 */
function getData(file) {
  appLog(DebugLevel.INFO, "[AppData]", `Reading ${file}`);
  const book = JSON.parse(JSON.stringify(require(`../data/${file}`)));
  readBooks.set(file, book);
  return book;
}

export function getBooks() {
  return BOOKS;
}

/**
 * returns the book object for the given book-key
 *
 * @param {*} key
 * @returns
 */
export function getBook(key) {
  const val = Object.keys(ALL_BOOKS).filter((objKey) => objKey.toLowerCase() == key.toLowerCase());
  return ALL_BOOKS[val];
}
