import React from "react"; 
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        return (
                <div className="TrackList">
                   { this.props.tracks.map(track => {
                    return <Track onRemove={this.props.onRemove} track={track} key={track.id}  isRemoval={this.props.isRemoval} onAdd={this.props.onAdd}/>
                   })}
                  </div>
        )
    }
}

export default TrackList; 