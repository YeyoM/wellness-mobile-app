/** generateImageURL
 * @param {string} slug - The slug of the exercise.
 * @returns {string} - The URL of the image of the exercise.
 */
export default function generateImageURL(slug) {
  return `https://raw.githubusercontent.com/YeyoM/exercise-db/main/exercises/${slug}`;
}
