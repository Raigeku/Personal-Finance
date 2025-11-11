import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TransactionForm from './TransactionForm';

interface AddTransactionModalProps {
	open: boolean;
	onClose: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
	open,
	onClose,
}) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			slotProps={{
				backdrop: {
					sx: {
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
			}}
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: 4,
					borderRadius: 2,
					outline: 'none',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						mb: 2,
					}}
				>
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
