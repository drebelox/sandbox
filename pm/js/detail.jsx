/**
 * @jsx React.DOM
 */

var NavBar = React.createClass({
  render: function() {
    return (
      <div className="navbar">
        <div className="left-buttons">
        <button className="navbar-button">Dashboard<i className="font-icon-right fa fa-caret-down"></i></button>
        <button className="navbar-button">Projects<i className="font-icon-right fa fa-caret-down"></i></button>
        <button className="navbar-button">Issues<i className="font-icon-right fa fa-caret-down"></i></button>
        <button className="navbar-button">Agile<i className="font-icon-right fa fa-caret-down"></i></button>
        <button className="create-button">Create Issue</button>
        </div>
        <div className="right-buttons">
          <button className="navbar-button"><i className="font-icon-right fa fa-question-circle"></i><i className="font-icon-right fa fa-caret-down"></i></button>
          <button className="navbar-button"><i className="font-icon-right fa fa-cog"></i><i className="font-icon-right fa fa-caret-down"></i></button>
          <button className="navbar-button"><img className="button-img" src="../images/bodhi5.png"/><i className="font-icon-right fa fa-caret-down"></i></button>
        </div>
      </div>
    );
  }
})

var TitleHead = React.createClass({
  render: function() {
    return (
      <div className="title-box">
        <div className="icons"><img className="icon" src="../images/bodhi5.png"/>
        </div>
          <div className="title-links">
            <div className="links">
              <a className="link" href="#">Project</a> /
              <a className="link" href="#">PROJ-100</a>
            </div>
            <h1 className="ticket-title">Create React-Based Project Management System</h1>
          </div>
      </div>
    );
  }
});

var ButtonBar = React.createClass({
  render: function() {
    return (
      <div className="button-bar">
      <div className="left-buttons">
      <button id="edit" className="button-bar-button"><i className="font-icon-left fa fa-pencil"></i>Edit</button>
      <button id="comment" className="button-bar-button"><i className="font-icon-left fa fa-comment-o"></i>Comment</button>
      <button id="assign" className="button-bar-button">Assign</button>
      <button id="more" className="button-bar-button">More<i className="font-icon-right fa fa-angle-down"></i></button>
      <button id="closeIssue" className="button-bar-button">Close Issue</button>
      <button id="reopenIssue" className="button-bar-button">Reopen Issue</button>
      <button id="admin" className="button-bar-button">Admin</button>
      </div>
      <div className="right-buttons">
      <button id="share" className="button-bar-button"><i className="font-icon-left fa fa-share"></i>Share</button>
      <button id="export" className="button-bar-button"><i className="font-icon-left fa fa-download"></i>Export<i className="font-icon-right fa fa-angle-down"></i></button>
      </div>
      </div>
    );
  }
});

var LeftContent = React.createClass({
  render: function() {
    return (
      <div className="left-content">
        <ul>
          <li>
            <DetailsBox/>
          </li>
          <li>
            <DescriptionBox/>
          </li>
          <li>
            <ActivityBox/>
          </li>
          <li>
            <CommentBox/>
          </li>
        </ul>
      </div>
    );
  }
});

var RightContent = React.createClass({
  render: function() {
    return (
      <div className="right-content">
        <ul>
          <li>
            <PeopleBox/>
          </li>
          <li>
            <DatesBox/>
          </li>
          <li>
            <TrackingBox/>
          </li>
          <li>
            <AgileBox/>
          </li>
        </ul>
      </div>
    );
  }
});



var MainContent = React.createClass({
  render: function() {
    return (
      <div className="main-content">
        <LeftContent/>
        <RightContent/>
      </div>
    );
  }
});



var CollapseBox = React.createClass({
  getInitialState: function() {
    return {
      open: true
    }
  },
  toggleContent: function() {
    this.setState({open: !this.state.open});
    console.log("toggle");
  },
  render: function() {
    return (
      <div className="collapse-box">
        <div className="collapse-heading">
          <h3 id="collapse-button" onClick={this.toggleContent}><i className={"font-icon-left fa " + (this.state.open ? "fa-angle-down" : "fa-angle-right")}></i>Title</h3>
        </div>
        <div className="collapse-content" style={{display: (this.state.open ? "block" : "none")}}>
        </div>
      </div>
    );
  }
})

var DetailsBox = React.createClass({
  getInitialState: function() {
    return {
      open: true
    }
  },
  toggleContent: function() {
    this.setState({open: !this.state.open});
    console.log("toggle");
  },
  render: function() {
    return (
      <div className="collapse-box">
        <div className="collapse-heading">
          <h4 id="collapse-button" onClick={this.toggleContent}><i className={"font-icon-left fa " + (this.state.open ? "fa-angle-down" : "fa-angle-right")}></i>Details</h4>
        </div>
        <div className="collapse-content" style={{display: (this.state.open ? "block" : "none")}}>
        <div style={{float: "left", width: "50%"}}>
          <ul>
          <li className="detail-item">
            <strong className="name-left">Type:</strong>
            <p className="name">New Feature</p>
          </li>
          <li className="detail-item">
            <strong className="name-left">Priority:</strong>
            <p className="name">Major</p>
          </li>
          <li className="detail-item">
            <strong className="name-left">Affects Version/s:</strong>
            <p className="name">None</p>
          </li>
          <li className="detail-item">
            <strong className="name-left">Component/s:</strong>
            <p className="name">None</p>
          </li>
          <li className="detail-item">
            <strong className="name-left">Labels:</strong>
            <p className="name">None</p>
          </li>
          <li className="detail-item">
            <strong className="name-left">Sprint:</strong>
            <p className="name">Sprint 1 - PROJ</p>
          </li>
          </ul>
          </div>
          <div style={{float: "right", width: "50%"}}>
          <ul>
          <li className="detail-item">
            <strong className="name-left">Status:</strong>
            <p className="name">Resolved</p>
          </li>
          <li className="detail-item">
            <strong className="name-left">Resolution:</strong>
            <p className="name">Fixed</p>
          </li>
          <li className="detail-item">
            <strong className="name-left">Fix Version/s:</strong>
            <p className="name">1.0.0, Sprint 1</p>
          </li>
          </ul>
          </div>
        </div>
      </div>
    );
  }
})

var DescriptionBox = React.createClass({
  getInitialState: function() {
    return {
      open: true,
      edit: true
    }
  },
  toggleContent: function() {
    this.setState({open: !this.state.open});
    console.log("toggle");
  },
  toggleTextArea: function() {
    this.setState({edit: !this.state.edit});
    console.log("text");
  },
  render: function() {
    return (
      <div className="collapse-box">
        <div className="collapse-heading">
          <h4 id="collapse-button" onClick={this.toggleContent}><i className={"font-icon-left fa " + (this.state.open ? "fa-angle-down" : "fa-angle-right")}></i>Description</h4>
        </div>
        <div className="collapse-content" style={{display: (this.state.open ? "block" : "none")}}>
          <strong className="name" onClick={this.toggleTextArea} style={{display: (this.state.edit ? "block" : "none")}}>Click to add a Description... </strong>
          <div style={{display: (this.state.edit ? "none" : "block")}}>
          <textarea className="comment-text" cols="80" rows="10"></textarea>
          </div>
          <div>
          <button id="cancel-button" className="button-bar-button" onClick={this.toggleTextArea} style={{display: (this.state.edit ? "none" : "block")}}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
})

var ActivityBox = React.createClass({
  getInitialState: function() {
    return {
      open: true
    }
  },
  toggleContent: function() {
    this.setState({open: !this.state.open});
    console.log("toggle");
  },
  render: function() {
    return (
      <div className="collapse-box">
        <div className="collapse-heading">
          <h3 id="collapse-button" onClick={this.toggleContent}><i className={"font-icon-left fa " + (this.state.open ? "fa-angle-down" : "fa-angle-right")}></i>Activity</h3>
        </div>
        <div className="collapse-content" style={{display: (this.state.open ? "block" : "none")}}>
        </div>
      </div>
    );
  }
})

var CommentBox = React.createClass({
  getInitialState: function() {
    return {
      open: false
    }
  },
  toggleContent: function() {
    this.setState({open: !this.state.open});
    console.log("toggle");
  },
  render: function() {
    return (
      <div className="comment-box">
        <button className="button-bar-button" onClick={this.toggleContent}><i className="font-icon-left fa fa-comment-o"></i>Comment</button>
        <div className="comment-content" style={{display: (this.state.open ? "block" : "none")}}>
          <h4 className="comment-header">Comment</h4>
          <textarea className="comment-text" cols="120" rows="10"></textarea>
          <div className="comment-buttons">
          <button id="audience-button" className="button-bar-button"><i className="font-icon-left fa fa-unlock"></i><i className="font-icon-left fa fa-caret-down"></i></button>
          <button id="cancel-button" className="button-bar-button" onClick={this.toggleContent}>Cancel</button>
          <button id="add-button" className="button-bar-button" onClick={this.toggleContent}>Add</button>
          </div>
        </div>
      </div>
    );
  }
});

var PeopleBox = React.createClass({
  getInitialState: function() {
    return {
      open: true
    }
  },
  toggleContent: function() {
    this.setState({open: !this.state.open});
    console.log("toggle");
  },
  render: function() {
    return (
      <div className="collapse-box">
        <div className="collapse-heading">
          <h3 id="collapse-button" onClick={this.toggleContent}><i className={"font-icon-left fa " + (this.state.open ? "fa-angle-down" : "fa-angle-right")}></i>People</h3>
        </div>
        <div className="collapse-content" style={{display: (this.state.open ? "block" : "none")}}>
          <div>
            <ul>
            <li className="detail-item">
              <strong className="name-right">Assignee:</strong>
              <img className="people-img" src="../images/bodhi5.png"/>
              <p className="name">Assignee Name</p>
            </li>
            <li className="detail-item">
              <strong className="name-right">Reporter:</strong>
              <img className="people-img" src="../images/bodhi5.png"/>
              <p className="name">Reporter Name</p>
            </li>
            <li className="detail-item">
              <strong className="name-right">Reviewer:</strong>
              <img className="people-img" src="../images/bodhi5.png"/>
              <p className="name">Reviewer Name</p>
            </li>
            <li className="detail-item">
              <strong className="name-right">Votes:</strong>
              <p className="count-label">0</p>
            </li>
            <li className="detail-item">
              <strong className="name-right">Watchers:</strong>
              <p className="count-label">0</p>
            </li>
            </ul>
            </div>
        </div>
      </div>
    );
  }
});

var DatesBox = React.createClass({
  getInitialState: function() {
    return {
      open: true
    }
  },
  toggleContent: function() {
    this.setState({open: !this.state.open});
    console.log("toggle");
  },
  render: function() {
    return (
      <div className="collapse-box">
        <div className="collapse-heading">
          <h3 id="collapse-button" onClick={this.toggleContent}><i className={"font-icon-left fa " + (this.state.open ? "fa-angle-down" : "fa-angle-right")}></i>Dates</h3>
        </div>
        <div className="collapse-content" style={{display: (this.state.open ? "block" : "none")}}>
          <div>
            <ul>
            <li className="detail-item">
              <strong className="name-right">Created:</strong>
              <p className="date">20/Aug/14 11:02 AM</p>
            </li>
            <li className="detail-item">
              <strong className="name-right">Updated:</strong>
              <p className="date">21/Aug/14 4:07 PM</p>
            </li>
            <li className="detail-item">
              <strong className="name-right">Resolved:</strong>
              <p className="date">22/Aug/14 12:30 PM</p>
            </li>
            </ul>
            </div>
        </div>
      </div>
    );
  }
});

var TrackingBox = React.createClass({
  getInitialState: function() {
    return {
      open: true
    }
  },
  toggleContent: function() {
    this.setState({open: !this.state.open});
    console.log("toggle");
  },
  render: function() {
    return (
      <div className="collapse-box">
        <div className="collapse-heading">
          <h3 id="collapse-button" onClick={this.toggleContent}><i className={"font-icon-left fa " + (this.state.open ? "fa-angle-down" : "fa-angle-right")}></i>Time Tracking</h3>
        </div>
        <div className="collapse-content" style={{display: (this.state.open ? "block" : "none")}}>
          <div>
            <ul>
            <li className="detail-item">
              <strong className="name-right">Estimated:</strong>
              <div className="meter-view">
              <div className="meter">
                <span style={{width: "90%"}}></span>
              </div>
                <p className="name" style={{float: "right"}}>2h</p>
              </div>
            </li>
            <li className="detail-item">
              <strong className="name-right">Remaining:</strong>
              <div className="meter-view">
              <div className="meter">
                <span style={{width: "0%"}}></span>
              </div>
                <p className="name" style={{float: "right"}}>0h</p>
              </div>
            </li>
            <li className="detail-item">
              <strong className="name-right">Logged:</strong>
              <div className="meter-view">
              <div className="meter-green">
                <span style={{width: "100%"}}></span>
              </div>
                <p className="name" style={{float: "right"}}>1h 45m</p>
              </div>
            </li>
            </ul>
            </div>
        </div>
      </div>
    );
  }
});

var AgileBox = React.createClass({
  getInitialState: function() {
    return {
      open: true
    }
  },
  toggleContent: function() {
    this.setState({open: !this.state.open});
    console.log("toggle");
  },
  render: function() {
    return (
      <div className="collapse-box">
        <div className="collapse-heading">
          <h3 id="collapse-button" onClick={this.toggleContent}><i className={"font-icon-left fa " + (this.state.open ? "fa-angle-down" : "fa-angle-right")}></i>Agile</h3>
        </div>
        <div className="collapse-content" style={{display: (this.state.open ? "block" : "none")}}>
          <div>
            <ul>
            <li className="detail-item">
              <strong className="name-right">Active Sprint:</strong>
              <p><a href="#">Sprint 1 - PROJ</a></p><p>ends 25/Aug/14</p>
              <p><a href="./board.html">View on Board</a></p>
            </li>
            </ul>
            </div>
        </div>
      </div>
    );
  }
});

var Main = React.createClass({
  render: function() {
    return (
      <div>
      <NavBar/>
      <TitleHead/>
      <ButtonBar/>
      <MainContent/>
      </div>
    );
  }
})

React.renderComponent(<Main/>, document.body);
