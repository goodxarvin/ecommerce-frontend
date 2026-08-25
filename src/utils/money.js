export default function getStandardPrice(centPrice) {
  if (centPrice >= 0) {
    return `$${(centPrice / 100).toFixed(2)}`;
  } else {
    return `-$${(-centPrice / 100).toFixed(2)}`;
  }
}
