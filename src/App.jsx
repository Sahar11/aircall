import React from 'react';
import ReactDOM from 'react-dom';
import Inbox from './components/inbox/Inbox.jsx';
import Header from './Header.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      
      <div className="container-view"><Inbox /></div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
