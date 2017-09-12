var esa = sel => document.querySelectorAll(sel)

var bindAll = function (sel, event, callback) {
  var l = esa(sel)
  for (var i = 0; i < l.length; i++) {
    var input = l[i]
    input.addEventListener(event, e => {
      callback(e)
    })
  }
}

var debug = function (debug) {
  if (!debug) {
    return
  }

  let box = document.getElementById('set_config')

  debugConfig.forEach(v => {
    let html = `<div><label><input class="auto_slider" max="${v.max}" min="${v.min}" type="${v.type}" data-value="${v.name}">${v.show} : <span class="kk_label">${v.value}</span></label></div>`
    box.innerHTML += html
  })

  bindAll('.auto_slider', 'input', e => {
    let target = e.target
    let bindValue = target.dataset.value
    let v = target.value
    config[bindValue] = v

    let label = target.closest('label').querySelector('.kk_label')
    label.innerText = v
  })
}