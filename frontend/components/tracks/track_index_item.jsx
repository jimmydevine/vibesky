import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import WaveFormContainer from '../trackplayer/waveform_container';

//will import track index item
class TrackItem extends React.Component {
  constructor(props) {
    super(props);
    this.songButton = this.songButton.bind(this);
  }

  songButton(track, e) {
    e.preventDefault();
    let { currentTrack, playing, trackId } = this.props.trackplayer;
    if (currentTrack === null) {
      this.props.setCurrentTrack(track);
    }
    if (currentTrack !== null && trackId == track.id) {
        this.props.setPlayPause(!playing);
      } else {
        this.props.setCurrentTrack(track);
      }
  }

  deleteSong(trackId, e){
    e.preventDefault();
    this.props.deleteTrack(trackId);
  }

  componentDidMount() {
  }

  userTrackButtons() {
    let track = this.props.track;
    if (this.props.currentUser.id == track.uploaderId){
      return (
        <div className='button-bar'>
          <div className='controller-btn like-btn'>like</div>
          <Link to={`/tracks/${track.id}/edit`} className="controller-btn edit-btn">Edit</Link>
          <div className='controller-btn delete-btn' onClick={(e) => this.props.deleteSong(track.id, e)}>Delete</div>
        </div>
      )}else{
        return (
          <div className='button-bar'>
            <div className='controller-btn like-btn'>like</div>
          </div>
        )};
  }

  render(){
    let { track, trackplayer } = this.props;

    let buttonPlaying = (trackplayer.playing && trackplayer.trackId === track.id) ?
      'ti-play playing' : 'ti-play';
    let buttonBar = this.userTrackButtons();
    return (
      <div className='track-item-container'>

        <div className='track-uploader-info'>
          <aside className="track-uploader-circle">
            <img src={track.imageUrl}/>
          </aside>
          <aside className="track-uploader-name">{track.uploader}</aside>
        </div>

        <div className='track-item'>
          <div className='track-image-box'>
            <img src={track.imageUrl}/>
          </div>

          <section className='track-details'>
            <div className='td-top'>
              <div className={buttonPlaying} onClick={(e) => this.songButton(track, e)}>

              </div>
              <div className="ti-upload-det">
                <aside className="ti-description">{track.uploader}</aside>
                <aside className="ti-title">{track.title}</aside>
              </div>
            </div>
            <div className='sound-bar'>
              <span></span>
              <WaveFormContainer track={track}/>
            </div>
            {buttonBar}
          </section>

        </div>

      </div>
    )
  }
}

export default TrackItem;