import ReactDOM from 'react-dom';
import { getRoutes } from './route';
import './index.css';

ReactDOM.render(
  getRoutes(),
  document.getElementById('root')
);
