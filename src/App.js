import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './Component/UserList/UserList';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UpdateDate from './Component/UpdateDate/UpdateDate';
import CreateData from './Component/CreateData/CreateData';
function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/home">
						<UserList />
					</Route>
					<Route path="/updateUser">
						<UpdateDate />
					</Route>
					<Route path="/CreateUser">
						<CreateData />
					</Route>
					<Route path="/">
						<UserList />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
