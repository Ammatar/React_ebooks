import './App.css';
import Header from './components/Header';
import VerticalTabs from './components/VerticalTabs';
import Footer from './components/Footer';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <div>
          <VerticalTabs />
        </div>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
