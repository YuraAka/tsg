import ReactDOM from 'react-dom';
import { getRoutes } from './route';
import './index.css';

//import {App, Index, UsersIndex, User, Users, About} from './test'

ReactDOM.render(
  getRoutes(),
  document.getElementById('root')
);


/*ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="/index" component={Index}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('root'))
*/
