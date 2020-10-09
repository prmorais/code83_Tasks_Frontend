import React from "react";
import { Button } from "react-bootstrap";

const Form: React.FC = () => {
	return (
		<div className="container">
			<br />
			<div className="task-header">
				<h1>Cadastro tarefa</h1>
				<Button size="sm" variant="dark">
					Voltar
				</Button>
			</div>
			<br />
		</div>
	);
};

export default Form;
