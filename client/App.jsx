// App component - represents the whole app
App = React.createClass({

   // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

    getInitialState: function() {
    // naming it initialX clearly indicates that the only purpose
    // of the passed down prop is to initialize something internally
    this.followCount();
    return {followerCount: 0};
  },

  getMeteorData() {
    return {
      tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },

  followCount() {
    var me = this;
    Meteor.call('getFollowerCount', function(error, resp){
      if(error){

      } else {
        me.setState({followerCount: resp });
      }
    });
  },
 
  renderTasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
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
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
          <p> asdsd {this.state.followerCount}</p>
          <button onClick={this.attemptLogin}> 
            Click me 
          </button>


          <form className="new-task" onSubmit={this.handleSubmit} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks" />
          </form>
        </header>
 
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});