import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import TaskForm from "./pages/Tasks/Form";

const Routes: React.FC = () => {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/tasks" exact component={Tasks} />
			<Route path="/tasks_add" exact component={TaskForm} />
		</Switch>
	);
};

export default Routes;
