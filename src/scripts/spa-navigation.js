import {
    shouldNotIntercept,
    updateTheDOMSomehow,
    getFragment
} from './utils'
  

function shouldDisableSpa() {
    return false;
}

navigation.addEventListener('navigate', (navigateEvent) => {
    if (shouldDisableSpa()) return
    if (shouldNotIntercept(navigateEvent)) return

    const toUrl = new URL(navigateEvent.destination.url)
    
    if (location.origin !== toUrl.origin) return

    handleTransition(navigateEvent)
});

function handleTransition(navigateEvent) {
  navigateEvent.intercept({
    scroll: 'manual',
    async handler() {
      const fragmentUrl = getFragment(navigateEvent);
      const response = await fetch(fragmentUrl)
      const data = await response.text()

      if (!document.startViewTransition) {
        updateTheDOMSomehow(data)
        return
      }

      const transition = document.startViewTransition(() => {
        updateTheDOMSomehow(data)
      })

      await transition.finished
    },
  })
}