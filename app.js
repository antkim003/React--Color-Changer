
var App = React.createClass({
  getDefaultProps: function() {
    return {
      txt: "this is the default text",
      buildNumber: 0.111
    }
  },
  getInitialState: function() {
    return {
      red: 128,
      green: 128,
      blue: 128
    }
  },
  update: function(ev) {
    this.setState({
      red: this.refs.red.refs.inp.getDOMNode().value,
      green: this.refs.green.refs.inp.getDOMNode().value,
      blue: this.refs.blue.refs.inp.getDOMNode().value
    });
  },
  render:function(){
    return (
      <div className="App">
        <h1>version: {this.props.buildNumber} id: {this.state.id}</h1>
        <Slider ref="red"   update={this.update} />
        <label>{this.state.red}</label>
        <Slider ref="green" update={this.update} />
        <label>{this.state.green}</label>
        <Slider ref="blue"  update={this.update} />        
        <label>{this.state.blue}</label>

        <ColorChanger red={this.state.red} green={this.state.green} blue={this.state.blue} />
      </div>
    )
  }
});

var ColorChanger = React.createClass({
  render: function() {
    var rgbcolor = 'rgb(' + this.props.red + ',' + this.props.green + ',' + this.props.blue + ')';
    var style = {
      background: rgbcolor,
      position: 'relative',
      width: '400',
      height: '400'
    };
    return (
      <div className="colorChanger" style={style}>
        Heres the color of the style {rgbcolor}
      </div>
    );
  }
});
var Slider = React.createClass({

  render:function(){
    return (
      <div>
      <input ref="inp" type="range" min="0" max="255" onChange={this.props.update} />
      </div>
    )
  }
});
React.render(<App />, document.body);