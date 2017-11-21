import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Counter from './components/Counter';
import './main.scss';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('mount')
  );
}

render(app);
