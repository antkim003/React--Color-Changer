
var App = React.createClass({
  getDefaultProps: function() {
    return {
      txt: "Color Generator UI",
      buildNumber: 1.0
    }
  },
  getInitialState: function() {
    return {
      red: 128,
      green: 128,
      blue: 128,
      opacity: 1
    }
  },

  // UI logic and actions
  update: function(ev) {
    this.setState({
      red: this.refs.red.refs.inp.getDOMNode().value,
      green: this.refs.green.refs.inp.getDOMNode().value,
      blue: this.refs.blue.refs.inp.getDOMNode().value,
      opacity: this.refs.opacity.refs.inp.getDOMNode().value
    });
  },
  reset: function(ev) {
    this.setState({
      red: 128,
      green: 128,
      blue: 128,
      opacity: 1
    });
  },
  setNewState: function(redVal, greenVal, blueVal, opacityVal) {
    this.setState({
      red: redVal,
      green: greenVal,
      blue: blueVal,
      opacity: opacityVal
    });
  },
  randomNumberGenerator: function(min, max, type) {
    // type can be arbitrary for float and decimals
    // type can be integer for integers
    if (type === "arbitrary") {
      return Math.random() * (max - min) + min;
    }
    if (type === "integer") {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  randomer: function(ev) {
    var red, green, blue, opacity;
    red      = this.randomNumberGenerator(0, 255, "integer");
    green    = this.randomNumberGenerator(0, 255, "integer");
    blue     = this.randomNumberGenerator(0, 255, "integer");
    opacity  = this.randomNumberGenerator(0, 1, "arbitrary").toFixed(2);
    this.setNewState(red, green, blue, opacity);
  },

  render:function(){
    bodyStyle = {
      fontFamily: 'Arial'
    };
    buttonStyles = {
      'padding': 15,
      fontSize: 14,
      backgroundColor: 'white',
      'border': '1px solid black',
      fontWeight: "bold",
      'margin': "10px 5px",
      borderRadius: '15px'
    };
    return (
      <div className="App" style={bodyStyle}>
        <h1>{this.props.txt} version: {this.props.buildNumber}</h1>
        <Slider ref="red"   update={this.update} value={this.state.red} type="color" />
        <label>{this.state.red}</label>
        <Slider ref="green" update={this.update} value={this.state.green} type="color" />
        <label>{this.state.green}</label>
        <Slider ref="blue"  update={this.update} value={this.state.blue} type="color" />        
        <label>{this.state.blue}</label>
        <Slider ref="opacity"  update={this.update} value={this.state.opacity} type="opacity" />        
        <label>{this.state.opacity}</label>


        <ColorResetter reset={this.reset} buttonStyles={buttonStyles}/>
        <ColorRandomer randomer={this.randomer} buttonStyles={buttonStyles} />
        <ColorDisplayer red={this.state.red} green={this.state.green} blue={this.state.blue} opacity={this.state.opacity} />
      </div>
    )
  }
});

// child componenets

var ColorRandomer = React.createClass({
  render: function() {
    return (
      <div className="ColorRandomer">
        <button onClick={this.props.randomer} style={this.props.buttonStyles}> Random Color </button>
      </div>
    );
  }
});

var ColorResetter = React.createClass({
  render: function() {
    return (
      <div className="ColorResetter">
        <button onClick={this.props.reset} style={this.props.buttonStyles}>Reset Color</button>
      </div>
    );
  }
});

var ColorDisplayer = React.createClass({
  render: function() {
    var rgbcolor = 'rgb(' + this.props.red + ',' + this.props.green + ',' + this.props.blue + ')';
    var style = {
      background: rgbcolor,
      position: 'relative',
      width: '400',
      height: '400',
      opacity: this.props.opacity
    };
    var fontColor = {
      color: rgbcolor
    };
    return (
      <div>
        <h3>Heres the color of the style <span style={fontColor}>{rgbcolor}</span></h3>
        <div className='colorDisplayer' style={style}></div>
      </div>
    );
  }
});

var Slider = React.createClass({
  render:function(){
    var maxVal, stepVal;
    if (this.props.type === "color") {
      maxVal = 255;
      stepVal = 1;
    } else {
      maxVal = 1.0;
      stepVal = 0.01;
    }
    return (
      <div>
        <input ref="inp" type="range" min="0" max={maxVal} step={stepVal} onChange={this.props.update} value={this.props.value} />
      </div>
    )
  }
});

React.render(<App />, document.body);