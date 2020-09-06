//Assist by Vonds
let input = document.getElementById('artist');
let second = document.getElementById('song');
let button = document.getElementsByTagName('button')
let lyrics = document.getElementById('lyrics');
let inputTag = document.getElementById('inputTag');
let buttonTag = document.getElementById('buttonTag');

buttonTag.addEventListener('click', testApi);

//get the button container
let button_div = document.getElementById('list-of-items');

function testApi(){
  fetch(`https://api.spotify.com/v1/search?type=album&q=%20${inputTag.value}`, {
    headers: { //pass in headers -- Authorization key
      // api will resets and will need new keys
      Authorization: 'Bearer BQAm5BsBY6cpr4cR0F9Hmfsbc_iCi-TK9WRCgqlAF6UeJaKsph6-gTztZzY5ngQVoWZfu8nYDxxwSLYPusX5vC3paHNpLBYZHKEWt4njywTC0ru6Uq9Sv_pt9GeLwqUFHI_wUY6FxVmz'
    }
  })
  .then( //get response and parse to json

    response => response.json()


  )
  .then(data => { //get data

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
