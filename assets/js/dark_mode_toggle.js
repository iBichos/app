document.addEventListener('DOMContentLoaded', () => {
  const darkClass = localStorage.getItem('dark-class')

  if (darkClass == 'dark-mode') {
    document.querySelector('body').classList.add(darkClass)
  } 

  const toggleButton = document.querySelector('.dark_toggle')
  toggleButton.addEventListener('click', () => {
    const body = document.querySelector('body')
    const darkClass = localStorage.getItem('dark-class')

    if (darkClass == 'dark-mode') {
      body.classList.remove('dark-mode')
      localStorage.removeItem('dark-class')
    } else {
      body.classList.add('dark-mode')
      localStorage.setItem('dark-class', 'dark-mode')
    }
  })
})
