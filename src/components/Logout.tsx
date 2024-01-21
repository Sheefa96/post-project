import React, { Component } from 'react';

interface LogoutProps {
  onLogout: () => void;
}

class Logout extends Component<LogoutProps> {
  handleLogout = () => {
    // Add your logout logic here
    this.props.onLogout();
  };

  render() {
    return (
      <div>
        <h2>Logout</h2>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

export default Logout;
