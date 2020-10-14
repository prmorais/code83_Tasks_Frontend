export interface ITask {
	id: number;
	title: string;
	description: string;
	finished: boolean;
	created_at?: Date;
	updated_at?: Date;
}

export interface ITaskIinput {
	title: string;
	description: string;
}

export interface IParams {
	id: string;
}
