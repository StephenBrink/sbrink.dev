export function shouldNotIntercept(navigationEvent) {
    return (
      navigationEvent.canIntercept === false ||
      navigationEvent.hashChange ||
      navigationEvent.downloadRequest ||
      navigationEvent.formData
    )
}

export function updateTheDOMSomehow(data) {
    document.getElementById('content').innerHTML = data
}

export function getFragment(navigateEvent) {
    const toUrl = new URL(navigateEvent.destination.url)
    const toPath = toUrl.pathname

    let fragment = '/fragments/About'
  
    if (toPath.startsWith('/blog')) {
        fragment = '/fragments/Blog'
    } 
    else if (toPath.startsWith('/resume')) {
        fragment = '/fragments/Resume'
    }

    return fragment
}
  