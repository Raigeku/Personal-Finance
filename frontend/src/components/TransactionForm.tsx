import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTransaction } from '../api/transactionApi';
import styles from './styles/TransactionForm.module.css';

interface TransactionFormProps {
	onSuccess?: () => void;
}

type TransactionFormValues = {
	description: string;
	amount: string; // string in input
	category: string;
	date: string;
	type: 'income' | 'expense';
};

const TransactionForm: React.FC<TransactionFormProps> = ({ onSuccess }) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: createTransaction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['transactions'] });
			if (onSuccess) onSuccess();
		},
	});

	const [values, setValues] = useState<TransactionFormValues>({
		description: '',
		amount: '',
		category: '',
		date: new Date().toISOString().split('T')[0],
		type: 'expense',
	});

	const [errors, setErrors] = useState<
		Partial<Record<keyof TransactionFormValues, string>>
	>({});

	const theme = useTheme();
	const isDark = theme.palette.mode === 'dark';

	const handleChange =
		(field: keyof TransactionFormValues) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setValues((v) => ({ ...v, [field]: e.target.value }));
		};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const newErrors: typeof errors = {};
		if (!values.description)
			newErrors.description = 'Description is required';
		if (!values.amount) newErrors.amount = 'Amount is required';
		if (!values.category) newErrors.category = 'Category is required';
		if (!values.date) newErrors.date = 'Date is required';
		if (!values.type) newErrors.type = 'Type is required';

		setErrors(newErrors);
		if (Object.keys(newErrors).length > 0) return;

		const payloadToSend = {
			...values,
			amount: parseFloat(values.amount),
		} as unknown as Omit<import('../api/transactionApi').Transaction, 'id'>;

		await mutation.mutateAsync(payloadToSend);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Box className={styles.form}>
				<TextField
					fullWidth
					label="Description"
					value={values.description}
					onChange={handleChange('description')}
					error={!!errors.description}
					helperText={errors.description}
					size="medium"
				/>
				<TextField
					fullWidth
					label="Amount"
					type="number"
					value={values.amount}
					onChange={handleChange('amount')}
					error={!!errors.amount}
					helperText={errors.amount}
					size="medium"
					inputProps={{ step: '0.01' }}
				/>
				<TextField
					fullWidth
					label="Category"
					value={values.category}
					onChange={handleChange('category')}
					error={!!errors.category}
					helperText={errors.category}
					size="medium"
				/>
				<TextField
					fullWidth
					label="Date"
					type="date"
					value={values.date}
					onChange={handleChange('date')}
					error={!!errors.date}
					helperText={errors.date}
					InputLabelProps={{ shrink: true }}
					className={
						isDark ? styles.datePickerDark : styles.datePicker
					}
					size="medium"
				/>
				<TextField
					fullWidth
					select
					label="Type"
					value={values.type}
					onChange={handleChange('type')}
					error={!!errors.type}
					helperText={errors.type}
					size="medium"
				>
					<MenuItem value="income">Income</MenuItem>
					<MenuItem value="expense">Expense</MenuItem>
				</TextField>

				<Button
					fullWidth
					type="submit"
					variant="contained"
					color="primary"
					disabled={mutation.status === 'pending'}
					sx={{ py: 1.5, fontSize: '1rem' }}
				>
					{mutation.status === 'pending'
						? 'Saving...'
						: 'Save Transaction'}
				</Button>
			</Box>
		</form>
	);
};

export default TransactionForm;
