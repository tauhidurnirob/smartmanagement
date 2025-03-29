export const requestFullscreen = async (element: any) => {
  if (element.requestFullscreen) {
    await element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    await element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    await element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    await element.msRequestFullscreen()
  }
}

export const exitFullscreen = async () => {
  if (document.exitFullscreen) {
    await document.exitFullscreen()
  }
}
