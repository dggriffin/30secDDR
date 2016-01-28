// Task component - represents a single todo item
Track = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    track: React.PropTypes.object.isRequired
  },
  handleClick() {
    Dispatch('AUDIO_TRACK_SELECTED', {track: this.props.track, audio: State.get('audioTrack')});
    Dispatch('PLAY_STATE_CHANGED', {audio: State.get('audioTrack')});
  },
  renderPlayTool() {
    let playState = State.get('playState');
    if (playState && playState.id === this.props.track.id) {
      if (playState.playing) {
        return <i className="fa fa-pause circle"></i>;
      }
    }
    return <i className="fa fa-play circle"></i>; 
  },
  render() {
    return (
      <a className="collection-item avatar" onClick={this.handleClick}>
        {this.renderPlayTool()}
        <span className="title"> {this.props.track.name} </span>
        <p className ="grey-text">
          {this.props.track.artists[0].name}
        </p>
      </a>
    );
  }
});