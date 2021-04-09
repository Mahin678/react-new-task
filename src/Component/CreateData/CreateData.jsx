import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../Header/Header';
import { Button, Spinner } from 'react-bootstrap';
const CreateData = () => {
	const { register, handleSubmit } = useForm();
	const [id, setId] = useState('');
	const [idError, setIdError] = useState('');
	const [user_name, setUser_name] = useState();
	const onSubmit = (data, e) => {
		const { readonly, required, title, value } = data;
		if (title && value) {
			setId(data);
			setIdError('Data Entered ');
		} else {
			setIdError('Please Enter exact data');
		}
		if (id) {
			setUser_name(id);
			fetch('http://localhost/api/submit_form.php', {
				method: 'POST', // or 'PUT'
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user_name),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('Success:', data);
					e.target.reset();
				});
		}
	};
	return (
		<div>
			<Header />
			<p
				className="text-center my-3 text-capitalize text-danger h4"
				style={{
					visibility: `${idError ? 'visible' : 'hidden'}`,
					height: '40px',
				}}
			>
				{id && !user_name
					? 'id  ' + idError + 'now Enter User data'
					: idError}
				{user_name ? ' and user data entered too' : ' '}
			</p>
			<h2 className="container text-info">{!id && 'Id info :'}</h2>
			<h2 className="container text-info">
				{id && !user_name ? 'User info ' : ''}
			</h2>
			<h2 className="container text-info">
				{id && user_name && 'Completed'}
			</h2>
			<div>
				<form
					className="form-group w-50 mx-auto mt-5"
					onSubmit={handleSubmit(onSubmit)}
				>
					<label htmlFor="title">Title</label>
					<input
						defaultValue={id ? ' ' : ' '}
						className="form-control "
						{...register('title', { required: false })}
					/>
					<label htmlFor="value">Value</label>

					<input
						{...register('value', {
							required: false,
						})}
						className="form-control"
					/>
					<div className="form-group">
						<label htmlFor="exampleFormControlSelect1">Required</label>
						<select
							{...register('required', { required: false })}
							className="form-control"
							id="exampleFormControlSelect1"
						>
							<option value={true}> true</option>
							<option value={false}>false</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="exampleFormControlSelect1">Read only</label>
						<select
							{...register('readonly', { required: false })}
							className="form-control"
							id="exampleFormControlSelect1"
						>
							<option value={true}> true</option>
							<option value={false}>false</option>
						</select>
					</div>
					<div className=" form-check my-3">
						<input
							className="form-check-input"
							type="checkbox"
							{...register('type', { required: false })}
						/>
						<label className="form-check-label" htmlFor="exampleCheck1">
							Type Hidden
						</label>
					</div>
					{/* <Spinner animation="border" size="sm" /> */}
					<Button type="submit" className="form-control btn btn-danger">
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
};

export default CreateData;
