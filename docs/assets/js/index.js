'use strict'
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../../serviceworker.js', {
      scope: '.'
    })
  })
}

const $ = el => document.querySelector(el)

$('a.button').addEventListener('click', e => {
  e.preventDefault()

  $('#_').scrollIntoView({
    behavior: 'smooth'
  })
})