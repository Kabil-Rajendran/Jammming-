import React  from "react"; 
import './Playlist.css';
import TrackList from '../TrackList/TrackList';



class Playlist extends React.Component {
       
      constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);

      }


    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }
    render() {
        return (
            <div className="Playlist">
                  <input type="text"  onChange={this.handleNameChange}  defaultValue="New Playlist" />
                  <TrackList tracks={this.props.playlistTracks} isRemoval={true}  onRemove={this.props.onRemove}/>
                  <button onClick = {this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
          </div>
        )
    }
}



export default Playlist;