import React, { useEffect, useState } from "react";
import { Badge, Table, Button } from "react-bootstrap";

import moment from "moment";

import apiConfig from "../../config/apiConfig";

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at?: Date;
  updated_at?: Date;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const tasks = await apiConfig.get("/tasks");
    setTasks(tasks.data);
  };

  const formatDate = (date: Date | undefined) => {
    return moment(date).format("DD/MM/YYYY HH:MM");
  };

  const statusTask = async (id: number) => {
    await apiConfig.patch(`/tasks/${id}`);
    loadTasks();
  };

  return (
    <div className="container">
      <br />
      <h1>Página de tarefas</h1>
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
                <Button size="sm">Editar</Button>{" "}
                <Button
                  onClick={() => statusTask(task.id)}
                  size="sm"
                  variant={!task.finished ? "success" : "warning"}
                >
                  {!task.finished ? "Finalizar" : "Pendente"}
                </Button>{" "}
                <Button size="sm" variant="info">
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
