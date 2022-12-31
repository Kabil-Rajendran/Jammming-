import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import  Spotify  from '../../util/Spotify';

Spotify.getAccessToken();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        searchResults:[],
        playlistName :'New Playlist',
        playlistTracks: []
    };
     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
     this.updatePlaylistName = this.updatePlaylistName.bind(this);
     this.savePlaylist = this.savePlaylist.bind(this);
     this.search = this.search.bind(this);
    } 
 addTrack(trackSong) {
    let playlistAdd = this.state.playlistTracks;
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === trackSong.id)) {
        return;
      }
      playlistAdd.push(trackSong);
    this.setState({
        playlistTracks: playlistAdd
    })
      
 }
  removeTrack(track) {

   let playlistRemove = this.state.playlistTracks;
   let value = playlistRemove.filter(removeTrack =>removeTrack.id !== track.id);
   this.setState({
    playlistTracks: value
   })
    
 }

 updatePlaylistName(name) {
   this.setState({
    playlistName: name
  })
 }
 savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playlistName, trackURIs).then(() =>
    this.setState({
      playlistTracks: [],
      playlistName: 'New Playlist'
    }) )

 }
   search(term) {
     Spotify.search(term).then(searchResults => 
     this.setState({
    searchResults: searchResults
  }))
  }


  
    
    
   render() {
       return (
                    <div>
                            <h1>Ja<span className="highlight">mmm</span>ing</h1>
                            <div className="App">
                                     <SearchBar  onSearch={this.search}/>
                                     <div className="App-playlist">
                                           <SearchResults searchResults={this.state.searchResults}  onAdd={this.addTrack} />
                                           <Playlist  onSave= {this.savePlaylist} onNameChange={this.updatePlaylistName}onRemove= {this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
                                      
                                       </div>
                            </div>
                      </div>
    )
   }

}

export default App;
