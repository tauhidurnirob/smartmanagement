export default function asyncQuerySelector(selector: string, callback: (element: Element) => void) {
  const observer = new MutationObserver((_, observer) => {
    const targetElement = document.querySelector(selector)
    if (targetElement) {
      observer.disconnect()

      // Trigger callback function with target element passed an argument
      callback(targetElement)
    }
  })

  // Initialize browser observer API
  observer.observe(document.documentElement, { childList: true, subtree: true })
}
