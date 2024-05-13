import Fuse from "fuse.js";
import localExercises from "../Exercises/exercises.json";

/** SearchExercise
 * @param {string} searchInput - The input to search for in the exercises.json file
 * @returns {array} - The array of results from the search
 */
export default function SearchExercise({ searchInput }) {
  try {
    const fuseOptions = {
      keys: ["name"],
    };
    const fuse = new Fuse(localExercises, fuseOptions);
    const results = fuse.search(searchInput);
    if (results.length === 0) {
      return [];
    } else if (results.length < 10) {
      return results;
    }
    return results.slice(0, 10);
  } catch (error) {
    console.log(error);
    return [];
  }
}
