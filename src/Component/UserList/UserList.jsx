import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const UserList = () => {
	const [list, setList] = useState([]);
	const [searchList, setSearchList] = useState([]);

	useEffect(() => {
		fetch('http://localhost/api/list.php')
			.then((response) => response.json())
			.then((res) => setList(res));
	}, []);

	const data = list.data || '';
	const head = data.headers || [];
	const body = data.rows || [];
	const handelUserData = (e) => {
		const userId = e.target.value;
		fetch(`http://localhost/api/get_form.php?id=${userId}`)
			.then((response) => response.json())
			.then((res) => setSearchList(res));
	};

	const searchData = searchList.data || [];
	const searchResult = searchData.fields || [];
	return (
		<div>
			<div className="container pt-3">
				<Header />
				<div>
					<input
						onBlur={handelUserData}
						placeholder="Enter User id"
						type="text"
						className="form-control my-5 w-50 mx-auto"
					/>
				</div>
				{searchResult.length ? (
					<table className="table">
						<thead>
							{searchResult &&
								searchResult.map((info, i) => (
									<tr key={i}>
										{console.log(info)}
										{info.id && <th>{info.id.title}</th>}
										{info.name && <th>{info.name.title}</th>}
										{info.details && <th>{info.details.title}</th>}
										{info.user_email && (
											<th>{info.user_email.title}</th>
										)}
										{info.user_gender && (
											<th>{info.user_gender.title}</th>
										)}
										{info.user_name && (
											<th>{info.user_name.title}</th>
										)}
										{info.user_hobby && (
											<th>{info.user_hobby.title}</th>
										)}
										{info.user_hobby && (
											<th>{info.user_hobby.title}</th>
										)}
									</tr>
								))}
						</thead>
						<tbody>
							{searchResult.map((info, i) => (
								<tr key={i}>
									{info.id && <th>{info.id.value}</th>}
									{info.name && <th>{info.name.value}</th>}
									{info.details && <th>{info.details.value}</th>}
									{info.user_email && <th>{info.user_email.value}</th>}
									{info.user_gender && (
										<th>{info.user_gender.title}</th>
									)}
									{info.user_name && <th>{info.user_name.value}</th>}
									{info.user_hobby && <th>{info.user_hobby.value}</th>}
								</tr>
							))}
						</tbody>
					</table>
				) : list ? (
					<table className="table">
						<thead>
							{head.map((info, i) => (
								<tr key={i}>
									{info.id.hidden ? (
										' '
									) : (
										<th scope="col">{info.id.title}</th>
									)}
									{info.name.hidden ? '' : <th>{info.name.title}</th>}
									{info.created_at.hidden ? (
										''
									) : (
										<th scope="col">{info.created_at.title}</th>
									)}
									{info.message.hidden ? (
										''
									) : (
										<th scope="col">{info.message.title}</th>
									)}
								</tr>
							))}
						</thead>
						<tbody>
							{body.map((info, i) => (
								<tr key={i}>
									<th scope="row">{info.id}</th>
									<td>{info.name}</td>
									<td>{info.created_at}</td>
									<td>{info.message}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p className="h1 text-center pt-5">Loading....</p>
				)}
			</div>
		</div>
	);
};

export default UserList;
