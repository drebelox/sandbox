/**
 * @jsx React.DOM
 */

var Card = React.createClass({
  getInitialState: function () {
    return {
      dragging: false,
      style: {}
    };
  },
  onDragStart: function (e) {
    this.setState({dragging: true});
    e.dataTransfer.setData('ticket', JSON.stringify(this.props));
  },
  onDragLeave: function (e) {
    e.preventDefault();
    if (this.state.dragging || this.checkBounds(e)) return;
    this.setState({style: {}});
  },
  onDragEnd: function (e) {
    e.preventDefault();
    this.setState({dragging: false});
  },
  onDrop: function (e) {
    this.setState({style: {}});
  },
  onDragOver: function (e) {
    e.preventDefault();
    e.key = this.props.key;
    if (this.state.dragging) return;
    var shift = (((e.nativeEvent.target.clientHeight/2) / e.nativeEvent.offsetY) >> 0)
      ? {borderTop: 'solid 1px rgba(0,0,0, 0.3)'}
      : {borderBottom: 'solid 1px rgba(0,0,0, 0.3)'};

    this.setState({style: {border: 'dashed 3px rgba(0,0,0, 0.3)'}});
  },
  noBubble: function (e) {
    e.preventDefault();
    e.stopPropagation();
  },
  checkBounds: function (e) {
    // check bounds to avoid false leave events cause by child elements
    var evt = e.nativeEvent;
    var boundsX = (evt.offsetX > 0) && (evt.offsetX < evt.target.clientWidth);
    var boundsY = (evt.offsetY > 0) && (evt.offsetY < evt.target.clientHeight);
    return boundsX && boundsY;
  },
  render: function() {
    return (
      <li className='card level-2' draggable="true" style={this.state.style} onDragStart={this.onDragStart} onDragOver={this.onDragOver} onDrop={this.onDrop} onDragEnd={this.onDragEnd} onDragLeave={this.onDragLeave}>
        <div className='title' onDragLeave={this.noBubble}>
          {this.props.data.title}
        </div>
      </li>
    );
  }

});

// module.exports = Card;

var SwimLane = React.createClass({
  getInitialState: function () {
    return {
      hover: false
    };
  },
  onDragOver: function (e) {
    e.preventDefault();
    this.setState({hover: true});
    this.props.onDragOver && this.props.onDragOver(e, this.props.data.id);
  },
  onDragLeave: function (e) {
    if (this.checkBounds(e)) return;
    this.setState({hover: false});
  },
  onDrop: function (e) {
    e.preventDefault();
    var data = JSON.parse(e.dataTransfer.getData('ticket'));
    this.props.onDrop(data, this.props.data.id);
    this.setState({hover: false});
  },
  checkBounds: function (e) {
    // check bounds to avoid false leave events cause by child elements
    var evt = e.nativeEvent;
    var boundsX = (evt.offsetX > 0) && (evt.offsetX < evt.target.clientWidth);
    var boundsY = (evt.offsetY > 0) && (evt.offsetY < evt.target.clientHeight);
    return boundsX && boundsY;
  },
  render: function() {
    var style = (this.state.hover) ? {border: '2px dashed #777777'} : {};
    return (
      <div className='swimlane'>
        <div className='title'>
          {this.props.data.title}
        </div>
        <ul className='cards' style={style} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}>
          {this.props.children}
        </ul>
      </div>
    );
  }

});

//module.exports = SwimLane;

var Board = React.createClass({
  getInitialState: function () {
    return this.groupByStatus(this.props.data);
  },
  componentWillReceiveProps: function (props, nextProps) {
    this.setState(this.groupByStatus(nextProps.data));
  },
  groupByStatus: function (props) {
    var lanes = this.props.data.swimlanes.reduce(function (lanes, lane) {
      lanes[lane.id] = lane;
      lanes[lane.id].tickets = [];
      return lanes;
    },{});

    return props.tickets.reduce(function (lanes, ticket){
      lanes[ticket.status].tickets.push(ticket);
      return lanes;
    }, lanes);
  },
  onDragOver: function (e, lane) {
    console.log(e.key, lane);
  },
  onDrop: function (e,ee) {
    console.log(ee)
    var state = this.state;
    state[e.data.status].tickets.splice(e.key,1);
    e.data.status = ee;
    state[ee].tickets.push(e.data);
    this.setState(state);
    console.log(e);
  },
  render: function() {
    var self = this;
    return (
      <div className='board'>
        {this.props.data.swimlanes.map(function(lane, index){
          return (
            <SwimLane key={'lane-' + index} data={lane} onDrop={self.onDrop} onDragOver={self.onDragOver}>
              {self.state[lane.id].tickets.map(function (ticket, index){
                return <Card key={index} data={ticket}/>
              })}
            </SwimLane>
          );
        })}
      </div>
    );
  }
});

//module.exports = Board;

React.renderComponent(<Board data={SAMPLE_DATA}/>, document.getElementById('main'));