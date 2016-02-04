
/* Hoist some variables. */
let audio,
    context = new (window.AudioContext ||
                   window.webAudioContext ||
                   window.webkitAudioContext)(),
    /* Create a script processor node with a `bufferSize` of 1024. */
    processor = context.createScriptProcessor(1024),
    /* Create an analyser node */
    analyser = context.createAnalyser();

/* Wire the processor into our audio context. */
processor.connect(context.destination);
/* Wire the analyser into the processor */
analyser.connect(processor);

/* Define a Uint8Array to receive the analysers data. */
let data = new Uint8Array(analyser.frequencyBinCount);
analyser.getByteTimeDomainData(data);

let settings = {
  width: 500,
  height: 300,
  padding: 30,
  numDataPoints: 50,
  maxRange: function() {
    return Math.random() * 1000
  }
};


Visualizer = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    //track: React.PropTypes.object.isRequired
  },

    mixins: [ReactMeteorData],

    getMeteorData() {
    return {
      audioObject: State.get('audioTrack')
    }
  },

  componentWillMount: function() {
    this.randomizeData();

  },

  renderScatter : function() {
    if (this.data.audioObject) {
      let source = context.createMediaStreamSource(this.data.audioObject.srcObject);
      source.connect(analyser);
      return <ScatterPlot data={data} {...settings} />;
    }
    else {
      return;
    } 
  },


  randomizeData: function() {
    let randomData = [];
    d3.range(settings.numDataPoints).forEach(function() {
      let newNumber1 = Math.floor(Math.random() * settings.maxRange());
      let newNumber2 = Math.floor(Math.random() * settings.maxRange());
      randomData.push([newNumber1, newNumber2]);
    });
    this.setState({data: randomData});
  },

  render() {
    return (
      <div>
        <h1>React and D3 are Friends</h1>
        <ScatterPlot data={data} {...settings} />
        {data}
        <div className="controls">
          <button className={'btn randomize'} onClick={this.randomizeData}>Randomize Data</button>
        </div>
      </div>
    );
  }
});