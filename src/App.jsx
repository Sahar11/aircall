import React from 'react';
import ReactDOM from 'react-dom';
import Inbox from './components/inbox/Inbox.jsx';
import Tabs from './components/tabs/Tabs.jsx';
import Header from './Header.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <Tabs />
      <div className="container-view"><Inbox /></div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
