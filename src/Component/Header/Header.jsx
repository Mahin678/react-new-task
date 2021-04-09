import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div>
			<h2
				className="text-info text-center display-4 "
				style={{ textTransform: 'uppercase' }}
			>
				User Dashboard
			</h2>
			<div className="text-center">
				<Link to="/" className="mx-2">
					View all user
				</Link>
				<Link to="/updateUser" className="mx-2">
					Update User data
				</Link>
				<Link to="/createUser" className="mx-2">
					Create user Data
				</Link>
			</div>
		</div>
	);
};

export default Header;
