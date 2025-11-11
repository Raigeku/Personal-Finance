import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTransactions, deleteTransaction } from '../api/transactionApi';
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import { useFiltersStore } from '../stores/filtersStore';

type TransactionType = 'income' | 'expense';

interface Transaction {
	id: number;
	description: string;
	amount: number;
	category: string;
	date: string; // ISO date string from backend
	type: TransactionType;
}

export default function TransactionList(): React.ReactElement {
	const queryClient = useQueryClient();
	const { data, isLoading } = useQuery<Transaction[], Error>({
		queryKey: ['transactions'],
		queryFn: fetchTransactions,
	});

	const { type: filterType, category: filterCategory } = useFiltersStore();

	const mutation = useMutation<void, unknown, number>({
		mutationFn: (id: number) => deleteTransaction(id),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['transactions'] }),
	});

	if (isLoading) return <div>Loading...</div>;

	const filtered = data?.filter((t) => {
		if (filterType && filterType !== t.type) return false;
		if (
			filterCategory &&
			filterCategory !== '' &&
			filterCategory !== t.category
		)
			return false;
		return true;
	});

	return (
		<Table sx={{ tableLayout: 'fixed' }}>
			<TableHead>
				<TableRow>
					<TableCell>Description</TableCell>
					<TableCell>Amount</TableCell>
					<TableCell>Category</TableCell>
					<TableCell>Date</TableCell>

					<TableCell>Actions</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{filtered?.length === 0 ? (
					<TableRow>
						<TableCell colSpan={6} align="center">
							No transactions found for selected filters.
						</TableCell>
					</TableRow>
				) : (
					filtered?.map((t) => (
						<TableRow key={t.id}>
							<TableCell>{t.description}</TableCell>
							<TableCell
								sx={{
									color:
										t.type === 'income'
											? 'success.main'
											: 'error.main',
									fontWeight: 600,
								}}
							>
								{t.amount.toLocaleString(undefined, {
									style: 'currency',
									currency: 'EUR',
								})}
							</TableCell>
							<TableCell>{t.category}</TableCell>
							<TableCell>
								{new Date(t.date).toLocaleDateString()}
							</TableCell>

							<TableCell>
								<Button
									color="error"
									onClick={() => mutation.mutate(t.id)}
								>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
