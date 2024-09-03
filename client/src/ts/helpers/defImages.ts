const imagesContext = require.context("../../img/", false, /\.(png|jpg|jpeg)$/);
export const defImages = imagesContext.keys().map((key) => imagesContext(key));
