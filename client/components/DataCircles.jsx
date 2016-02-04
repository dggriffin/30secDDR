
DataCircles = React.createClass({
  render: function() {
    return <g>{ this.props.data.map(this.renderCircles) }</g>
  },


  renderCircles: function(coords) {
    var props = {
      cx: this.props.xScale(coords[0]),
      cy: this.props.yScale(coords[1]),
      r: 2
    };
    return (
      <circle {...props}>
      </circle>
    );
  }
});
