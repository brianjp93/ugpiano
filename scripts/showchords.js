//showchords.js

let CUSTOMCLASS = 'CUSTOM-ADDED-UGPIANO'

function getChordSpans() {
    let chord_spans = []
    let elts = document.getElementsByTagName('code')[0].getElementsByTagName('span')
    for (let elt of elts) {
        if (elt.children.length === 0) {
            let text = elt.innerText.trim()
            let mult = 1
            if (text.indexOf('/') >= 0) {
                mult = 2
            }
            let maxlen = 8 * mult
            if (text.length < maxlen && text.length > 0) {
                chord_spans.push(elt)
            }
        }
    }
    return chord_spans
}

function showChordDiagram(event) {
    let hook = event.target
    get_img_url(hook.innerText)
        .then(function(response) {
            response.text()
                .then(function(data) {
                    let url = parseimg(data)

                    let div = document.createElement('div')
                    div.setAttribute('class', CUSTOMCLASS)
                    div.style.position = 'absolute'
                    div.style.bottom = '20px'
                    div.style.left = '-30px'
                    div.style['z-index'] = '15'

                    let img = document.createElement('img')
                    img.setAttribute('src', url)
                    img.style['max-height'] = '130px'
                    div.appendChild(img)
                    hook.appendChild(div)
                    
                    hook.addEventListener('mouseout', function() {
                        let elts = document.getElementsByClassName(CUSTOMCLASS)
                        for (let elt of elts) {
                            elt.remove()
                        }
                    })
                })
        })
}

function get_img_url(chord) {
    let url = 'https://www.scales-chords.com/api/scapi.1.3.php'

    let data = {
        instrument: 'piano',
        chord: chord
    }

    const body = Object.keys(data).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    }).join('&')

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    })
}

function parseimg(response) {
    let re = /<img.*src="(.*)">/
    let match = response.match(re)
    let url = match[1]
    return url
}

function parseChord(chordstr) {
    let re = /([A-Z])([b#]?)([a-z]*)([0-9]?)/
    let match = chordstr.match(re)
    let key = match[1] + match[2]
    let variation = match[3]
    let num = match[4]
    return [key, variation, num]
}

function addEventListeners() {
    let elts = getChordSpans()
    for (let elt of elts) {
        elt.addEventListener('mouseenter', function(event) {
            chrome.storage.sync.get(['show_piano'], function(result) {
                if (result.show_piano) {
                    showChordDiagram(event)
                }
            })
        })
    }
}


addEventListeners()
