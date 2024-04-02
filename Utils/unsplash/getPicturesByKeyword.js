/** getPicturesByKeyword
 * @param {string} keyword - keyword to search for pictures on Unsplash
 * @returns {Promise} - a promise that resolves to an array of pictures
 * @description - This function fetches pictures from Unsplash based on a keyword
 */
export default async function getPicturesByKeyword(keyword) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${keyword}&orientation=landscape&per_page=6&client_id=${process.env.WELLNESS_UNSPLASH_API_KEY}`,
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error("Error fetching pictures from Unsplash", error);
  }
}
