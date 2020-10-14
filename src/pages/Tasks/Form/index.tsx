import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Button, Form } from "react-bootstrap";

import { IParams, ITaskIinput } from "../tasks.interface";
import apiConfig from "../../../config/apiConfig";

const TaskForm: React.FC = () => {
	const [model, setModel] = useState<ITaskIinput>({
		title: "",
		description: "",
	});

	const history = useHistory();
	const { id } = useParams<IParams>();

	useEffect(() => {
		if (id !== undefined) {
			findTask(id);
		}
	}, [id]);

	const updateModel = (e: ChangeEvent<HTMLInputElement>) => {
		setModel({
			...model,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (id !== undefined) {
			await apiConfig.put(`/tasks/${id}`, model);
		} else {
			await apiConfig.post("/tasks", model);
		}

		goBack();
	};

	async function findTask(id: string) {
		const data = (await apiConfig.get(`/tasks/${id}`)).data;

		setModel({
			...data,
		});
	}

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
						value={model.title}
						onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
						type="text"
						placeholder="Entre com o título"
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Descrição</Form.Label>
					<Form.Control
						name="description"
						value={model.description}
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
