import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainRoute from './component/MainRoute';
import ErrorBoundary from './commonComponent/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ErrorBoundary>
          <MainRoute />
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
