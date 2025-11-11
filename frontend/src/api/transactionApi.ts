import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL as string;

export type TransactionType = 'income' | 'expense';

export interface Transaction {
	id: number;
	description: string;
	amount: number;
	category: string;
	date: string; // ISO date string
	type: TransactionType;
}

export const fetchTransactions = async (): Promise<Transaction[]> => {
	const res = await axios.get<Transaction[]>(`${API_URL}/transactions`);
	return res.data;
};

export const createTransaction = async (
	data: Omit<Transaction, 'id'>
): Promise<Transaction> => {
	const res = await axios.post<Transaction>(`${API_URL}/transactions`, data);
	return res.data;
};

export const updateTransaction = async (
	id: number,
	data: Partial<Omit<Transaction, 'id'>>
): Promise<Transaction> => {
	const res = await axios.put<Transaction>(
		`${API_URL}/transactions/${id}`,
		data
	);
	return res.data;
};

export const deleteTransaction = async (id: number): Promise<void> => {
	await axios.delete(`${API_URL}/transactions/${id}`);
};

export default {
	fetchTransactions,
	createTransaction,
	updateTransaction,
	deleteTransaction,
};
