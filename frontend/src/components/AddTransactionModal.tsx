import React from 'react';
import {
	Modal,
	Box,
	Typography,
	IconButton,
	useMediaQuery,
	useTheme,
} from '@mui/material';
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
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
					top: isMobile ? '50%' : '50%',
					left: '50%',
					right: isMobile ? 16 : 'auto',
					transform: 'translate(-50%, -50%)',
					width: isMobile ? 'calc(100% - 32px)' : 400,
					maxWidth: isMobile ? 500 : 400,
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: isMobile ? 3 : 4,
					borderRadius: 2,
					outline: 'none',
					maxHeight: '90vh',
					overflowY: 'auto',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 2,
						position: 'sticky',
						top: 0,
						bgcolor: 'background.paper',
						zIndex: 1,
					}}
				>
					<Typography variant="h6">Add Transaction</Typography>
					<IconButton onClick={onClose} size="small">
						<CloseIcon />
					</IconButton>
				</Box>
				<TransactionForm onSuccess={onClose} />
			</Box>
		</Modal>
	);
};

export default AddTransactionModal;
