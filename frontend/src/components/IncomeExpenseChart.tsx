import React, { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchTransactions } from '../api/transactionApi';
import type { Transaction } from '../api/transactionApi';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

function getMonthKey(date: Date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
		2,
		'0'
	)}`;
}

function lastNMonths(n: number) {
	const res: { key: string; label: string }[] = [];
	const now = new Date();
	for (let i = n - 1; i >= 0; i--) {
		const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
		const key = getMonthKey(d);
		const label = d.toLocaleString(undefined, {
			month: 'short',
			year: 'numeric',
		});
		res.push({ key, label });
	}
	return res;
}

const IncomeExpenseChart: React.FC = () => {
	const { data: transactions = [], isLoading } = useQuery<
		Transaction[],
		Error
	>({ queryKey: ['transactions'], queryFn: fetchTransactions });

	const months = useMemo(() => lastNMonths(6), []);

	const { labels, incomeData, expenseData } = useMemo(() => {
		const map = new Map<string, { income: number; expense: number }>();
		months.forEach((m) => map.set(m.key, { income: 0, expense: 0 }));

		for (const t of transactions) {
			const d = new Date(t.date);
			const key = getMonthKey(d);
			if (!map.has(key)) continue;
			const entry = map.get(key)!;
			if (t.type === 'income') entry.income += t.amount;
			else entry.expense += t.amount;
		}

		const labels = months.map((m) => m.label);
		const incomeData = months.map(
			(m) => +(map.get(m.key)?.income.toFixed(2) ?? 0)
		);
		const expenseData = months.map(
			(m) => +(map.get(m.key)?.expense.toFixed(2) ?? 0)
		);
		return { labels, incomeData, expenseData };
	}, [transactions, months]);

	if (isLoading) return null;

	const data = {
		labels,
		datasets: [
			{
				label: 'Income',
				data: incomeData,
				backgroundColor: 'rgba(76, 175, 80, 0.8)',
			},
			{
				label: 'Expense',
				data: expenseData,
				backgroundColor: 'rgba(244, 67, 54, 0.8)',
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: { position: 'top' as const },
			title: { display: true, text: 'Income vs Expense (last 6 months)' },
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					callback: function (value: number | string) {
						if (typeof value === 'number')
							return value.toLocaleString(undefined, {
								style: 'currency',
								currency: 'EUR',
							});
						return value;
					},
				},
			},
		},
	};

	return (
		<Paper sx={{ p: 2, mb: 2 }} elevation={1}>
			<Typography variant="h6" sx={{ mb: 1 }}>
				Overview
			</Typography>
			<Box>
				<Bar options={options} data={data} />
			</Box>
		</Paper>
	);
};

export default IncomeExpenseChart;
