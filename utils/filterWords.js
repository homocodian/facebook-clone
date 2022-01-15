import filter from "bad-words";
const customBadWords = [...process.env.NEXT_PUBLIC_BAD_WORDS.split(",")];
const customFilter = new filter({ list: customBadWords });
export default customFilter;
