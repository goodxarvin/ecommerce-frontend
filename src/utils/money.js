export default function getStandardPrice(centPrice) {
  return `$${(centPrice / 100).toFixed(2)}`;
}
