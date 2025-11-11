import React from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	IconButton,
	Tooltip,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useThemeStore from '../stores/themeStore';

interface AppHeaderProps {
	onAddClick: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onAddClick }) => {
	const { mode, toggleMode } = useThemeStore();
	return (
		<AppBar
			position="static"
			elevation={2}
			sx={{
				background: 'linear-gradient(90deg,#1976d2 0%,#60a5fa 100%)',
			}}
		>
			<Toolbar>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2,
						flexGrow: 1,
					}}
				>
					<Typography variant="h6" component="div">
						💰 Personal Finance Tracker
					</Typography>
					<Typography variant="caption" sx={{ opacity: 0.85 }}>
						Track income and expenses effortlessly
					</Typography>
				</Box>
				<Tooltip
					title={
						mode === 'dark'
							? 'Switch to light mode'
							: 'Switch to dark mode'
					}
				>
					<IconButton
						color="inherit"
						onClick={toggleMode}
						sx={{ mr: 1 }}
					>
						{mode === 'dark' ? (
							<Brightness7Icon />
						) : (
							<Brightness4Icon />
						)}
					</IconButton>
				</Tooltip>

				<Button
					color="inherit"
					onClick={onAddClick}
					variant="outlined"
					sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
				>
					Add Transaction
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;
