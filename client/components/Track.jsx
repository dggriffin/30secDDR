// Task component - represents a single todo item
Track = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    //track: React.PropTypes.object.isRequired
  },
  handleClick(){
    new Audio(this.props.track.preview_url).play();
  },
  render() {
    return (
      <a className="collection-item avatar" onClick={this.handleClick}>
        <i className="fa fa-play circle"></i>
        <span className="title"> {this.props.track.name} </span>
        <p className ="grey-text">
          {this.props.track.artists[0].name}
        </p>
      </a>
    );
  }
});