import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import TransactionList from './TransactionList';
import TransactionListMobile from './TransactionListMobile';

export default function TransactionListResponsive(): React.ReactElement {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return isMobile ? <TransactionListMobile /> : <TransactionList />;
}
