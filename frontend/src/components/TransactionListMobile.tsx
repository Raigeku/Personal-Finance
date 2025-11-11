import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTransactions, deleteTransaction } from '../api/transactionApi';
import {
	Box,
	Card,
	CardContent,
	Typography,
	IconButton,
	Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFiltersStore } from '../stores/filtersStore';

type TransactionType = 'income' | 'expense';

interface Transaction {
	id: number;
	description: string;
	amount: number;
	category: string;
	date: string;
	type: TransactionType;
}

export default function TransactionListMobile(): React.ReactElement {
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

	if (isLoading) return <Typography>Loading...</Typography>;

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

	if (filtered?.length === 0) {
		return (
			<Box sx={{ textAlign: 'center', py: 4 }}>
				<Typography color="text.secondary">
					No transactions found for selected filters.
				</Typography>
			</Box>
		);
	}

	return (
		<Stack spacing={2}>
			{filtered?.map((t) => (
				<Card key={t.id} sx={{ borderRadius: 2 }}>
					<CardContent sx={{ pb: 1.5 }}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
								mb: 1,
								gap: 1,
							}}
						>
							<Box sx={{ flex: 1, minWidth: 0 }}>
								<Typography
									variant="subtitle1"
									sx={{
										fontWeight: 600,
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
									}}
								>
									{t.description}
								</Typography>
								<Typography
									variant="caption"
									color="text.secondary"
									sx={{ display: 'block', mt: 0.5 }}
								>
									{t.category}
								</Typography>
							</Box>
							<IconButton
								size="small"
								color="error"
								onClick={() => mutation.mutate(t.id)}
								sx={{ mt: -0.5, mr: -0.5 }}
							>
								<DeleteIcon fontSize="small" />
							</IconButton>
						</Box>

						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								pt: 1,
								borderTop: '1px solid',
								borderColor: 'divider',
							}}
						>
							<Typography
								variant="caption"
								color="text.secondary"
							>
								{new Date(t.date).toLocaleDateString()}
							</Typography>
							<Typography
								variant="body2"
								sx={{
									fontWeight: 700,
									color:
										t.type === 'income'
											? 'success.main'
											: 'error.main',
								}}
							>
								{t.type === 'income' ? '+' : '-'}
								{t.amount.toLocaleString(undefined, {
									style: 'currency',
									currency: 'EUR',
								})}
							</Typography>
						</Box>
					</CardContent>
				</Card>
			))}
		</Stack>
	);
}
