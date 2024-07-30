const imagesContext = require.context("../img/", false, /\.(png|jpg|jpeg)$/);
export const images = imagesContext.keys().map((key) => imagesContext(key));
