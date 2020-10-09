import moment from "moment";

export const formatDate = (date: Date | undefined) => {
	return moment(date).format("DD/MM/YYYY HH:MM");
};
