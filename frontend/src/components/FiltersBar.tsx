import React from 'react';
import {
	Paper,
	Typography,
	Box,
	Button,
	Stack,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { useFiltersStore } from '../stores/filtersStore';

const FiltersBar: React.FC = () => {
	const { type, setType } = useFiltersStore();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Paper
			elevation={1}
			sx={{
				p: isMobile ? 1.5 : 2,
				mb: isMobile ? 2 : 4,
				borderRadius: 2,
			}}
		>
			<Stack
				direction={isMobile ? 'column' : 'row'}
				alignItems={isMobile ? 'flex-start' : 'center'}
				justifyContent="space-between"
				gap={isMobile ? 1 : 0}
			>
				<Box>
					<Typography variant="subtitle1" gutterBottom>
						Filters
					</Typography>
					{!isMobile && (
						<Typography variant="caption" color="text.secondary">
							Showing transactions by type
						</Typography>
					)}
				</Box>
			</Stack>

			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: isMobile ? 1 : 2,
					mt: 1,
				}}
			>
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
