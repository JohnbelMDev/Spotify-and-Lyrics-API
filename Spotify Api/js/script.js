//DOMs
let input = document.getElementById('artist');
let second = document.getElementById('song');
let button = document.getElementsByTagName('button')
let lyrics = document.getElementById('lyrics');
let inputTag = document.getElementById('inputTag');
let buttonTag = document.getElementById('buttonTag');

buttonTag.addEventListener('click', testApi);

//get the button container
let button_div = document.getElementById('list-of-items');
// button.addEventListener('click', testApi)
// buttonTag.addEventListener('click', testApi);
function testApi(){
  fetch(`https://api.spotify.com/v1/search?type=album&q=%20${inputTag.value}`, {
    headers: { //pass in headers -- Authorization key
      Authorization: 'Bearer BQDa5jrHM1CKTgUhDUsnjh1lSYepfo2_lWnFVFuxwmYXvaR0A9UI-i2iuG2f314qDDhJqS7fyBCGpw_5ajOrDHTmDZsQkDqCMLv0HAei7aRONez8fZi8HCf1y96bZOfW7F3jhzn35sYM'
    }
  })
  .then( //get response and parse to json

    response => response.json()


  )
  .then(data => { //get data
    // console.log("I'm working");
    // console.log("data:",data.albums.items);
    let d = data.albums.items //get the item objects and pass it into a variables
    // console.log(data.tracks);
    for(var key in d){ //iterate through the item objects
      // console.log(d[key])
      let item_button = document.createElement('button') //create a new button
      button_div.appendChild(item_button) //append the button into the  button container
      item_button.innerHTML = d[key].name; //mark up the button as the name of the song
      item_button.value = d[key].name; //set the vale for the button
      item_button.addEventListener('click', (item_button) => {
        let artist = inputTag.value;
        console.log(artist);
        // console.log(item_button.srcElement.innerHTML)

        console.log(item_button.srcElement.innerHTML.replace('- Live', ''));
        fetch(`https://api.lyrics.ovh/v1/${artist}/${item_button.srcElement.innerHTML.replace('- Live', '')}`)

        .then(response => response.json())
        .then(data => {
          console.log(data);

          if (data.error) {
              lyrics.innerHTML = data.error
          }
          else {
            lyrics.innerHTML = data.lyrics
          }

        })
      })
    }
  })
  .catch(
    error => lyrics.innerHTML = ''
  )
}

// buttonTag.addEventListener('click', testApi);
