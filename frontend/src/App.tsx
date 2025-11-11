import React, { useState, useMemo } from 'react';
import { CssBaseline, Container, Paper, Box, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import styles from './components/styles/App.module.css';

import AppHeader from './components/AppHeader';
import FiltersBar from './components/FiltersBar';
import TransactionListResponsive from './components/TransactionListResponsive';
import AddTransactionModal from './components/AddTransactionModal';
import useThemeStore from './stores/themeStore';
import IncomeExpenseChart from './components/IncomeExpenseChart';

const App: React.FC = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const mode = useThemeStore((s) => s.mode);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					...(mode === 'light'
						? {
								primary: { main: '#1976d2' },
						  }
						: {
								primary: { main: '#90caf9' },
						  }),
				},
				components: {
					MuiPaper: {
						defaultProps: { elevation: 2 },
					},
				},
			}),
		[mode]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<AppHeader onAddClick={() => setModalOpen(true)} />

			<Box
				className={`${styles.container} ${
					mode === 'light' ? styles.light : styles.dark
				}`}
			>
				<Container maxWidth="md">
					<Typography variant="h4" className={styles.title}>
						Your transactions
					</Typography>

					<FiltersBar />

					<IncomeExpenseChart />

					<Paper className={styles.content} elevation={3}>
						<TransactionListResponsive />
					</Paper>
				</Container>
			</Box>

			<AddTransactionModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
			/>

			<ReactQueryDevtools initialIsOpen={false} />
		</ThemeProvider>
	);
};

export default App;
