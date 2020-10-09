import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import { Button, Form } from "react-bootstrap";

import { ITaskIinput } from "../tasks.interface";
import apiConfig from "../../../config/apiConfig";

const TaskForm: React.FC = () => {
	const [model, setModel] = useState<ITaskIinput>({
		title: "null",
		description: "",
	});

	const history = useHistory();

	const updateModel = (e: ChangeEvent<HTMLInputElement>) => {
		setModel({
			...model,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const task = await apiConfig.post("/tasks", model);

		console.log(task);
	};

	const goBack = () => {
		history.goBack();
	};

	return (
		<div className="container">
			<br />
			<div className="task-header">
				<h1>Cadastro tarefa</h1>
				<Button onClick={goBack} size="sm" variant="dark">
					Voltar
				</Button>
			</div>
			<br />
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Label>Título</Form.Label>
					<Form.Control
						name="title"
						onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
						type="text"
						placeholder="Entre com o título"
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Descrição</Form.Label>
					<Form.Control
						name="description"
						onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
						as="textarea"
						rows={3}
						placeholder="Entre com a descrição"
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Salvar
				</Button>
			</Form>
		</div>
	);
};

export default TaskForm;
