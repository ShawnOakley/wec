import React, { Component } from 'react';
import NavBar from './components/navBar';
import ProductDisplay from './components/productDisplay';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar
          selectedKey="homekeeping"
        />
        <ProductDisplay />
      </div>
    );
  }
}

export default App;
