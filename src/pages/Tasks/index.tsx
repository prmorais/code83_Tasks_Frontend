import React, { useEffect, useState } from "react";
import { Badge, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "./index.css";
import apiConfig from "../../config/apiConfig";
import { ITask } from "./tasks.interface";
import { formatDate } from "./taskUtils";

const Tasks: React.FC = () => {
	const [tasks, setTasks] = useState<ITask[]>([]);

	const history = useHistory();

	const newTask = () => {
		history.push("/tasks_add");
	};

	function editTask(id: number) {
		history.push(`/tasks_edit/${id}`);
	}

	const viewTask = (id: number) => {
		history.push(`/tasks_detail/${id}`);
	};

	const loadTasks = async () => {
		const tasks = await apiConfig.get("/tasks");
		setTasks(tasks.data);
	};

	const statusTask = async (id: number) => {
		await apiConfig.patch(`/tasks/${id}`);
		loadTasks();
	};

	useEffect(() => {
		loadTasks();
	}, []);

	return (
		<div className="container">
			<br />
			<div className="task-header">
				<h1>Lista de tarefas</h1>
				<Button onClick={newTask} size="sm" variant="dark">
					Nova tarefa
				</Button>
			</div>
			<br />

			<Table striped bordered hover className="text-center">
				<thead>
					<tr>
						<th>#</th>
						<th>Título</th>
						<th>Descrição</th>
						<th>Status</th>
						<th>Data de atualização</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map((task) => (
						<tr key={task.id}>
							<td>{task.id}</td>
							<td>{task.title}</td>
							<td>{task.description}</td>
							<td>
								<Badge variant={task.finished ? "success" : "warning"}>
									{task.finished ? "FINALIZADA" : "PENDENTE"}
								</Badge>
							</td>
							<td>{formatDate(task.updated_at)}</td>
							<td>
								<Button onClick={() => editTask(task.id)} size="sm">
									Editar
								</Button>{" "}
								<Button
									onClick={() => statusTask(task.id)}
									size="sm"
									variant={!task.finished ? "success" : "warning"}
								>
									{!task.finished ? "Finalizar" : "Pendente"}
								</Button>{" "}
								<Button
									onClick={() => viewTask(task.id)}
									size="sm"
									variant="info"
								>
									Visualizar
								</Button>{" "}
								<Button size="sm" variant="danger">
									Remover
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default Tasks;
