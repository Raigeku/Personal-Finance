import React from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	IconButton,
	Tooltip,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AddIcon from '@mui/icons-material/Add';
import useThemeStore from '../stores/themeStore';

interface AppHeaderProps {
	onAddClick: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onAddClick }) => {
	const { mode, toggleMode } = useThemeStore();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<AppBar
			position="static"
			elevation={2}
			sx={{
				background: 'linear-gradient(90deg,#1976d2 0%,#60a5fa 100%)',
			}}
		>
			<Toolbar sx={{ gap: isMobile ? 1 : 2 }}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: isMobile ? 1 : 2,
						flexGrow: 1,
						minWidth: 0,
					}}
				>
					<Typography
						variant={isMobile ? 'body1' : 'h6'}
						component="div"
						sx={{
							fontWeight: 600,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						💰 Finance
					</Typography>
					{!isMobile && (
						<Typography variant="caption" sx={{ opacity: 0.85 }}>
							Track income and expenses effortlessly
						</Typography>
					)}
				</Box>
				<Tooltip
					title={
						mode === 'dark'
							? 'Switch to light mode'
							: 'Switch to dark mode'
					}
				>
					<IconButton color="inherit" onClick={toggleMode}>
						{mode === 'dark' ? (
							<Brightness7Icon />
						) : (
							<Brightness4Icon />
						)}
					</IconButton>
				</Tooltip>

				{isMobile ? (
					<Tooltip title="Add Transaction">
						<IconButton
							color="inherit"
							onClick={onAddClick}
							size="large"
						>
							<AddIcon />
						</IconButton>
					</Tooltip>
				) : (
					<Button
						color="inherit"
						onClick={onAddClick}
						variant="outlined"
						sx={{ borderColor: 'rgba(255,255,255,0.2)' }}
					>
						Add Transaction
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;
