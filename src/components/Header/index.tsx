import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const Header: React.FC = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand href="#home">Code83 - Tarefas</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="#home">Início</Nav.Link>
				<Nav.Link href="#features">Tarefas</Nav.Link>
			</Nav>
		</Navbar>
	);
};

export default Header;
