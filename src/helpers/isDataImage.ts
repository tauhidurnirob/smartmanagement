export default function isDataImage(imageData: string) {
  return imageData.substring(0, 11) === 'data:image/'
}
