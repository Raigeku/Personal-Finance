import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TransactionForm from './TransactionForm';
import styles from './styles/AddTransactionModal.module.css';

interface AddTransactionModalProps {
	open: boolean;
	onClose: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
	open,
	onClose,
}) => {
	return (
		<Modal open={open} onClose={onClose}>
			<Box className={styles.modal}>
				<Box className={styles.header}>
					<Typography variant="h6">Add Transaction</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>
				<TransactionForm onSuccess={onClose} />
			</Box>
		</Modal>
	);
};

export default AddTransactionModal;
