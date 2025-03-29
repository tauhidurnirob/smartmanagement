export default function getImageSize(container: any, image: any) {
  const { width: wi, height: hi } = image
  const { width: wc, height: hc } = container
  const kw = wc / wi
  const kh = hc / hi
  const k = Math.min(kw, kh)
  const width = k * wi
  const height = k * hi
  return { width, height }
}
