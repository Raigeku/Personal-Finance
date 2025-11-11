import prisma from '../prismaClient.js';

// GET all transactions
export const getTransactions = async (req, res) => {
	try {
		const transactions = await prisma.transaction.findMany({
			orderBy: { date: 'desc' },
		});
		res.json(transactions);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
};

// ADD transaction
export const addTransaction = async (req, res) => {
	try {
		const { description, amount, category, date, type } = req.body;
		const transaction = await prisma.transaction.create({
			data: {
				description,
				amount: parseFloat(amount),
				category,
				date: new Date(date),
				type,
			},
		});
		res.status(201).json(transaction);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
};

// UPDATE transaction
export const updateTransaction = async (req, res) => {
	try {
		const { id } = req.params;
		const { description, amount, category, date, type } = req.body;
		const transaction = await prisma.transaction.update({
			where: { id: parseInt(id) },
			data: {
				description,
				amount: parseFloat(amount),
				category,
				date: new Date(date),
				type,
			},
		});
		res.json(transaction);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
};

// DELETE transaction
export const deleteTransaction = async (req, res) => {
	try {
		const { id } = req.params;
		await prisma.transaction.delete({ where: { id: parseInt(id) } });
		res.json({ message: 'Transaction deleted' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
};
