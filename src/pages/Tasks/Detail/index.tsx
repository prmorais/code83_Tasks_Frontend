import React, { useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import apiConfig from "../../../config/apiConfig";
import { IParams, ITask } from "../tasks.interface";
import { formatDate } from "../taskUtils";

const Detail: React.FC = () => {
	const [task, setTask] = useState<ITask>();
	const history = useHistory();
	const params = useParams<IParams>();

	useEffect(() => {
		if (params.id !== undefined) {
			viewTaskId(params.id);
		}
	}, [params.id]);

	async function viewTaskId(id: string) {
		const data = (await apiConfig.get<ITask>(`/tasks/${id}`)).data;
		setTask({
			...data,
		});
	}

	function goBack() {
		history.goBack();
	}

	return (
		<div className="container">
			<br />
			<div className="task-header">
				<h1>Detalhes da tarefa</h1>
				<Button onClick={goBack} size="sm" variant="dark">
					Voltar
				</Button>
			</div>
			<br />

			<Card>
				<Card.Body>
					<Card.Title>{task?.title}</Card.Title>
					<Card.Text>
						{task?.description}
						<br />
						<Badge variant={task?.finished ? "success" : "warning"}>
							{task?.finished ? "FINALIZADO" : "PENDENTE"}
						</Badge>
						<br />
						<strong>Data de Cadastro: </strong>
						<Badge variant="info">{formatDate(task?.created_at)}</Badge>
						<br />
						<strong>Data de Atualização: </strong>
						<Badge variant="info">{formatDate(task?.updated_at)}</Badge>
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Detail;
