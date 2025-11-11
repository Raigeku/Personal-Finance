import React from 'react';
import { Paper, Typography, Box, Button, Stack } from '@mui/material';
import { useFiltersStore } from '../stores/filtersStore';
import styles from './styles/FiltersBar.module.css';

const FiltersBar: React.FC = () => {
	const { type, setType } = useFiltersStore();

	return (
		<Paper className={styles.filtersContainer} elevation={1}>
			<Stack className={styles.header}>
				<Typography variant="subtitle1" gutterBottom>
					Filters
				</Typography>
				<Typography variant="caption" color="text.secondary">
					Showing transactions by type
				</Typography>
			</Stack>

			<Box className={styles.buttonsContainer}>
				<Button
					variant={type === 'income' ? 'contained' : 'outlined'}
					color="success"
					onClick={() => setType('income')}
				>
					Income
				</Button>
				<Button
					variant={type === 'expense' ? 'contained' : 'outlined'}
					color="error"
					onClick={() => setType('expense')}
				>
					Expense
				</Button>
				<Button
					variant={type === '' ? 'contained' : 'outlined'}
					onClick={() => setType('')}
				>
					All
				</Button>
			</Box>
		</Paper>
	);
};

export default FiltersBar;
