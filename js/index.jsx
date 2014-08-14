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
    // e.key = this.props.key;
    // if (this.state.dragging) return;
    // var shift = (((e.nativeEvent.target.clientHeight/2) / e.nativeEvent.offsetY) >> 0)
    //   ? {borderTop: 'solid 1px rgba(0,0,0, 0.3)'}
    //   : {borderBottom: 'solid 1px rgba(0,0,0, 0.3)'};

    // this.setState({style: {border: 'dashed 3px rgba(0,0,0, 0.3)'}});
  },
  preventDefault: function (e) {
    e.preventDefault();
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
      <li className={'card ' + (this.props.data.priority || '')} draggable="true" style={this.state.style} onDragStart={this.onDragStart} onDrop={this.onDrop} onDragEnd={this.onDragEnd} onDragLeave={this.preventDefault}>
        <div className='title' onDragLeave={this.preventDefault}>
          <i className='fa fa-lightbulb-o'> {this.props.data.title}</i>
        </div>
        <div className='description' onDragLeave={this.preventDefault}>
          {this.props.data.description}
        </div>
        <div className='meta'>
          <div className='type'>BH5-123</div>
          <div className='metric'><i className='fa fa-comment-o'> 34</i> <i className='fa fa-clock-o'> 34</i> <i className='fa fa-truck'> 34</i> </div>
          <div className='icons'><img className='icon' src="./images/avatar.jpg"/><img className='icon' src="./images/bodhi5.png"/></div>
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
    e.preventDefault();
    if (this.checkBounds(e) || (e.target.title !== 'cards')) return;
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
    var style = (this.state.hover) ?  'hover' : '';
    return (
      <div className='swimlane'>
        <div className='title'>
          {this.props.data.title}
        </div>
        <ul className={'cards ' + style} key='swimlane' title='cards' onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}>
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
  onDrop: function (e,ee) {
    var state = this.state;
    state[e.data.status].tickets.splice(e.key,1);
    e.data.status = ee;
    state[ee].tickets.push(e.data);
    this.setState(state);
  },
  render: function() {
    var self = this;
    return (
      <div className='main-content'>
      <div className="app-bar">
        <button id="menuToggle" className="app-bar-button menu-toggle menu-is-closed"><i className="fa fa-bars"></i></button>
        <h1 id="appHeadline" className="app-headline">Bodhi5 - Sprint 1</h1>
        <button id="sortToggle" className="app-bar-button sort-toggle"><i className="fa fa-search"></i></button>
      </div>
      <div className='board'>
        {this.props.data.swimlanes.map(function(lane, index){
          return (
            <SwimLane key={'lane-' + index} data={lane} onDrop={self.onDrop}>
              {self.state[lane.id].tickets.map(function (ticket, index){
                return <Card key={index} data={ticket}/>
              })}
            </SwimLane>
          );
        })}
      </div>
      </div>
    );
  }
});

//module.exports = Board;

React.renderComponent(<Board data={SAMPLE_DATA}/>, document.getElementById('main'));