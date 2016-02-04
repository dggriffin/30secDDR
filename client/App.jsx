let timer;

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
      user: Meteor.users.findOne()
    }
  },
 
  renderTracks() {
    return this.state.searchResults.map((track) => {
      return <Track key={track.id} track={track} />;
    });
  },

  renderLogin() {
    if (this.data.user) {
      let spotifyAccount = Meteor.user().services.spotify;

      return spotifyAccount ? 
      <a className="dropdown-button" href="#!" data-activates="dropdown1">
        Logged in as {spotifyAccount.display_name}
        <i className="fa fa-caret-down  right"/> 
      </a> : 
      <button className="btn azm-social azm-btn azm-border-bottom azm-spotify" 
            onClick={this.attemptLogin}>
              <i className="fa fa-spotify"></i> 
              LOG IN TO SPOTIFY
      </button>
    }
  },

  attemptLogin() {
    let scopes = ['playlist-modify-private', 'user-library-read','user-follow-read', 'playlist-read-private'];
    let options = {
      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
      requestPermissions: scopes // Spotify access scopes.
    };
    Meteor.loginWithSpotify(options, function(accessToken) {
      console.log(accessToken);
    });
  },

  handleChange(event) {
    let value = event.target.value;
    if (value) {
      Meteor.call('typeaheadTracks', value, (error, resp) => {
        if (error) {

        } else {
          this.setState({searchResults: resp});
        }
      });
    }
    else {
      this.setState({searchResults: []});
    }
  },
 
  render() {
    return (
        <header>
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper teal">
                <a href="#!" className="brand-logo center thin">30secDDR</a>
                <ul className="right">
                  <li>{this.renderLogin()}</li>
                </ul>
              </div>
            </nav>
          </div>
          <ul id="dropdown1" className="dropdown-content">
            <li className="divider"></li>
            <li><a href="#!">Log out</a></li>
          </ul>
          <div className="container">
              <input
                type="text"
                ref="textInput"
                onChange={this.handleChange}
                placeholder="Type to search tracks" />

            <ul className="collection"
                ref="trackResults">
              {this.renderTracks()}
            </ul>
          </div>
          <Visualizer/>
        </header>
    );
  }
});