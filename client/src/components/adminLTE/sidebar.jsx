'use strict'

var React = require('react');
var Link = require('react-router').Link

var Sidebar = React.createClass({

  render: function() {
    return (
      <aside className="main-sidebar">

        <section className="sidebar">
          <ul className="sidebar-menu">
            <li className="header">SERVICES</li>

            <li className={this.props.activeLink=="/routes"?"active":null}>
              <Link to={"/routes"}>
                <i className="fa fa-link"></i>
                <span>Routes</span>
              </Link>
            </li>
            <li className={this.props.activeLink=="/consumers"?"active":null}>>
              <Link to={"/consumers"}>
                <i className="fa fa-link"></i>
                <span>Consumers</span>
              </Link>
            </li>
            <li className={this.props.activeLink=="/vehicles"?"active":null}>>
              <Link to={"/vehicles"}>
                <i className="fa fa-link"></i>
                <span>Vehicles</span>
              </Link>
            </li>
            <li className={this.props.activeLink=="/map-test"?"active":null}>>
              <Link to={"/map-test"}>
                <i className="fa fa-link"></i>
                <span>Map test</span>
              </Link>
            </li>
          </ul>

        </section>

      </aside>

    )
  }
});
module.exports = Sidebar;
