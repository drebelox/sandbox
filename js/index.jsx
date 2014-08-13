/**
 * @jsx React.DOM
 */

var Card = React.createClass({
  onDragStart: function (e) {
    e.dataTransfer.setData('ticket', JSON.stringify(this.props));
  },
  render: function() {
    return (
      <div className='card level-2' draggable="true" onDragStart={this.onDragStart}>
        <div className='title'>
          {this.props.data.title}
        </div>
      </div>
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
  },
  onDragLeave: function () {
    this.setState({hover: false});
  },
  onDrop: function (e,f) {
    e.preventDefault();
    var data = JSON.parse(e.dataTransfer.getData('ticket'));
    this.props.onDrop(data, this.props.data.id);
    this.setState({hover: false});
  },
  render: function() {
    var style = (this.state.hover) ? {border: '1px dotted #444444'} : {};
    return (
      <div className='swimlane'>
        <div className='title'>
          {this.props.data.title}
        </div>
        <div className='cards' style={style} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}>
          {this.props.children}
        </div>
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
    return props.tickets.reduce(function (lanes, ticket){
      if (!lanes[ticket.status]) {
        lanes[ticket.status] = [ticket]
      } else {
        lanes[ticket.status].push(ticket);
      }

      return lanes;
    }, {});
  },
  onDrop: function (e,ee) {
    var state = this.state;
    state[e.data.status].splice(e.key,1);
    state[ee].push(e.data);
    this.setState(state);
    console.log(e);
  },
  render: function() {
    var self = this;
    return (
      <div className='board'>
        {this.props.data.swimlanes.map(function(lane, index){
          return (
            <SwimLane key={'lane-' + index} data={lane} onDrop={self.onDrop}>
              {(self.state[lane.id]||[]).map(function (ticket, index){
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