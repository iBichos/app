document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('html').style.fontSize = localStorage.getItem('font-size')

  document.querySelector('.increase_font').addEventListener( 'click', () => {
    const documentStyle = getComputedStyle(document.querySelector('html'))
  
    let nextValue = Math.min(parseInt(documentStyle.fontSize), 30) + 2
    document.querySelector('html').style.fontSize = `${nextValue}px`
    
    localStorage.setItem('font-size', `${nextValue}px`)
    const box = document.getElementById('search-field').getBoundingClientRect();
    const dropdown = document.getElementById('suggestion-list');
    dropdown.style.top = box.bottom + 'px';
    dropdown.style.left = box.left + 'px';
    dropdown.style.width = (box.width - 27) + 'px';
  })
  
  document.querySelector('.decrease_font').addEventListener( 'click', () => {
    const documentStyle = getComputedStyle(document.querySelector('html'))
  
    let nextValue = Math.max(parseInt(documentStyle.fontSize), 16) - 2
    document.querySelector('html').style.fontSize = `${nextValue}px`
  
    localStorage.setItem('font-size', `${nextValue}px`)
    const box = document.getElementById('search-field').getBoundingClientRect();
    const dropdown = document.getElementById('suggestion-list');
    dropdown.style.top = box.bottom + 'px';
    dropdown.style.left = box.left + 'px';
    dropdown.style.width = (box.width - 27) + 'px';
  })
})
