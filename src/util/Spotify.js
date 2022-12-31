const cliend_id = 'b42a284910674200a74c2cd54f4e6e9a';
const  redirect_uri  = 'http://faded-girl.surge.sh/callback/';
const url = `https://accounts.spotify.com/authorize?client_id=${cliend_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri }`;
let accessToken;
let expiresIn;
  const Spotify = { 


 getAccessToken() {
    if (accessToken) {
        return accessToken;
    }

    const accessTokenUri = window.location.href.match(/access_token=([^&]*)/);
    const expriesInUri = window.location.href.match(/expires_in=([^&]*)/);
    if(accessTokenUri && expriesInUri  ) {
     
        accessToken = accessTokenUri[1];
        expiresIn = expriesInUri[1];
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
    else {
        window.location = url;
    }
 },



 search(term) {
    return fetch (`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {Authorization: `Bearer ${accessToken}`}   
     }).then(response => {
         if (response.ok) {
            return response.json();
         }
         throw new Error ('Request failed'); },
          netWorkError => console.log(netWorkError.message))
          .then(jsonResponse => {
             if (!jsonResponse.tracks) {
                return [];
             } 
                return jsonResponse.tracks.items.map(track => ({
                   id: track.id, 
                   name: track.name, 
                   artist: track.artists[0].name, 
                   album: track.album.name,
                    uri:track.uri

                }));
               })           
         
 },


 savePlayList(name, trackUris) {
   if (!name && !trackUris.length) {
      return;
   }
   const token= accessToken;
   
   const headers = { Authorization: `Bearer ${token}`};
   let userId;
   let playlistId;
   return fetch('https://api.spotify.com/v1/me' , {
      headers: headers
   }).then(response => response.json())
   .then(jsonResponse => {
      userId = jsonResponse.id;
       return fetch(`https://api.spotify.com/v1/users/${userId}/playlists` , {
         headers: headers,
         method: 'POST',
         body: JSON.stringify({
            name: name
         })
      }).then(response => response.json())
      .then(jsonResponse => {
         playlistId = jsonResponse.id;
         return  fetch (`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({
               uris: trackUris
            })
         });
      });
   });
  



},
  }

export default Spotify;





