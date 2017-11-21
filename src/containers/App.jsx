import React from 'react';
import Counter from '../components/Counter.jsx';
import '../main.scss';

/**
 * A counter button: tap the button to increase the count.
 */
class App extends React.Component {
  render() {
    return (
      <div>
        Hello world
        <br />
        <Counter />
      </div>
    );
  }
}
export default App;
