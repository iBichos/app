document.addEventListener('DOMContentLoaded', () => {
  const darkClass = localStorage.getItem('dark-class')
  document.querySelector('html').classList.add(darkClass)

  document.querySelector('.dark_toggle').addEventListener( 'click', () => {
    const darkClass = localStorage.getItem('dark-class')

    if (darkClass === 'dark-mode') {
      document.querySelector('html').classList.remove('dark-mode')
      localStorage.setItem('dark-class', 'dark-mode')
    } else {      
      document.querySelector('html').classList.add('dark-mode')
      localStorage.removeItem('dark-class')
    }
  })
})
