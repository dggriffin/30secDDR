// App component - represents the whole app
App = React.createClass({

   // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

    getInitialState: function() {
    // naming it initialX clearly indicates that the only purpose
    // of the passed down prop is to initialize something internally
    return {
      searchResults: []
    };
  },

  getMeteorData() {
    return {
      tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },
 
  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  renderSongs() {
    return this.state.searchResults.map((track) => {
      return <p>{track.artists[0].name} - {track.name}</p>
    });
  },

  renderLogin() {
    if (Meteor.user()) {
      let spotifyAccount = Meteor.user().services.spotify;
      return spotifyAccount ? <p> Logged in as {spotifyAccount.display_name}</p> : 
      <button className="btn azm-social azm-btn azm-border-bottom azm-spotify" 
            onClick={this.attemptLogin}>
              <i className="fa fa-spotify"></i> 
              LOG IN TO SPOTIFY
            </button>
      }
  },

  attemptLogin() {
    var scopes = ['playlist-modify-private', 'user-library-read','user-follow-read', 'playlist-read-private'];
    var options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: scopes // Spotify access scopes.
    };
    Meteor.loginWithSpotify(options, function(accessToken) {
      console.log(accessToken);
    });
  },

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Tasks.insert({
      text: text,
      createdAt: new Date() // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = "";
  },

  searchTracks(event){
    let value = event.target.value;
    if (!value) {
      let myNode = ReactDOM.findDOMNode(this.refs.trackResults);
      while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
      }
      return;
    }
    Meteor.call('typeaheadTracks', event.target.value, (error, resp) => {
      if (error) {

      } else {
        this.setState({searchResults: resp});
      }
    });
  },
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>30secDDR</h1>

          {this.renderLogin()}

          <input
            type="text"
            ref="textInput"
            onChange={this.searchTracks}
            placeholder="Type to search tracks" />

        </header>
 
        <ul ref="trackResults">
          {this.renderSongs()}
        </ul>
      </div>
    );
  }
});