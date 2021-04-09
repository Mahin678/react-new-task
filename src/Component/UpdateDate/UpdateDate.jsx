import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';

const UpdateDate = () => {
	const [list, setList] = useState([]);
	const [update, setUpdate] = useState(false);
	const [updateValue, setUpdateValue] = useState('');
	useEffect(() => {
		fetch('http://localhost/api/list.php')
			.then((response) => response.json())
			.then((res) => setList(res));
	}, []);
	const data = list.data || '';
	const head = data.headers || [];
	const body = data.rows || [];
	const handleOnChangeValue = (e) => {
		const of = e.target.value;
		const os = e.target.name;
		let userInfo = {};
		if (os == 'name') {
			userInfo.name = os;
			userInfo.value = of;
		} else if (os == 'message') {
			userInfo.name = os;
			userInfo.value = of;
		} else if (os == 'created_at') {
			userInfo.name = os;
			userInfo.value = of;
		}
		setUpdateValue(userInfo);
	};
	const handleSubmit = (info) => {
		const { created_at, id, message, name } = info;
		setUpdate(true);
		let userInfo = {};
		if (updateValue.name == 'name') {
			userInfo.name = updateValue.value;
		} else if (updateValue.message == 'message') {
			userInfo.message = updateValue.value;
		} else if (updateValue.created_at == 'created_at') {
			userInfo.created_at = updateValue.value;
		}
		const finalData = {
			name: userInfo.name ? userInfo.name : name,
			message: userInfo.message ? userInfo.message : message,
			created_at: userInfo.created_at ? userInfo.created_at : created_at,
			id: id,
		};
		fetch('http://localhost/api/submit_form.php', {
			method: 'UPDATE', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(finalData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Success:', data);
			});
	};

	return (
		<div>
			<Header />
			<div>
				<table className="table">
					<thead>
						{head.map((info, i) => (
							<tr key={i}>
								{info.id.hidden ? (
									' '
								) : (
									<th scope="col">{info.id.title}</th>
								)}
								{info.name.hidden ? '' : <th>{info.name.title} </th>}
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
								<th scope="row">
									{update ? (
										<input
											name="id"
											type="text"
											defaultValue={info.id}
											onChange={handleOnChangeValue}
										/>
									) : (
										info.id
									)}
								</th>
								<td>
									{update ? (
										<input
											name="name"
											type="text"
											defaultValue={info.name}
											onChange={handleOnChangeValue}
										/>
									) : (
										info.name
									)}
								</td>
								<td>
									{update ? (
										<input
											name="created_at"
											type="text"
											defaultValue={info.created_at}
											onChange={handleOnChangeValue}
										/>
									) : (
										info.created_at
									)}
								</td>
								<td>
									{update ? (
										<input
											name="message"
											type="text"
											defaultValue={info.message}
											onChange={handleOnChangeValue}
										/>
									) : (
										info.message
									)}
								</td>
								<td>
									<button
										className="btn btn-danger"
										onClick={() => handleSubmit(info)}
									>
										Update
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UpdateDate;
