import axios from "axios";

const API_URL = "http://192.168.1.2:5000/api";

// checkin api endpoint
export const checkIn = async (
	latitude: number,
	longitude: number,
	emp_id: string
) => {
	return axios.post(`${API_URL}/checkin`, { latitude, longitude, emp_id });
};

// checkout api endpoint
export const checkOut = async (emp_id: string) => {
	return axios.post(`${API_URL}/checkout`, { emp_id });
};

// employee login endpoint
export const login = async (email: string, password: string) => {
	return axios.post(`${API_URL}/login-employee`, { email, password });
};

// employee request leave endpoint
export const leaveRequest = async (
	leave_type: string,
	starting_date: string,
	ending_date: string,
	emp_id: string,
	reason: string
) => {
	const payload: {
		leave_type: string;
		starting_date: string;
		ending_date?: string;
		emp_id: string;
		reason: string;
	} = {
		leave_type,
		starting_date,
		emp_id,
		reason,
	};

	if (ending_date) {
		payload.ending_date = ending_date;
	}

	console.log(payload);

	return axios.post(`${API_URL}/ask-leave`, payload);
};

// employee view their leave requests
export const fetchLeaveRequests = async (emp_table_id: string) => {
	return axios.post(`${API_URL}/get-leaves`, { emp_table_id });
};

// employee profile endpoint
export const fetchEmployeeProfile = async (emp_table_id: number) => {
	return axios.post(`${API_URL}/get-employee`, { emp_table_id });
};

// employee password reset request endpoint
export const requestPasswordReset = async (
	full_name: string,
	department: string,
	role: string,
	message: string
) => {
	return axios.post(`${API_URL}/reset-password-request`, {
		full_name,
		department,
		role,
		message,
	});
};

// timer sync endpoint
export const timerSyncRequest = async (emp_id: number) => {
	return axios.post(`${API_URL}/sync-timer`, { emp_id });
};

// get synced timer endpoint
export const getSyncedTime = async (emp_id: number) => {
	return axios.post(`${API_URL}/get-synced-timer`, { emp_id });
};
