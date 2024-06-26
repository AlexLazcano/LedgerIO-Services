const TransactionService = require('../services/transactions.service');

const TransactionController = {

    async createTransaction(req, res) {
        try {
            console.log("Create Transaction");
            const { sender, recipient, total, description, splitAmount } = req.body;
            const date = new Date();

            const transaction = await TransactionService.createTransaction(sender, recipient, total, splitAmount,  date, description || "");
            res.status(201).json(
                transaction
            );
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async getTransactions(req, res) {
        console.log("Get Transactions");
        try {
            const transactions = await TransactionService.getTransactionsByFilter({});

            res.status(200).json(transactions);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    // async deleteSplitTransaction(req, res) {
    //     try {
    //         const { id } = req.params; // Extract the ID sender the request parameters
    //         const deletedTransaction = await splitTransactionService.deleteSplitTransactionsByFilter({ _id: id });
    //         res.status(200).json({
    //             message: 'Split transaction deleted successfully',
    //             deletedTransaction
    //         });
    //     } catch (error) {
    //         res.status(400).json({
    //             error: error.message
    //         });
    //     }
    // },
    // async  getAllSplitTransactions(req, res) {
    //     try {
    
    //         const transactions = await splitTransactionService.getSplitTransactionsByFilter({});
            
    //         // Check if transactions are empty or null
    //         if (!transactions || transactions.length === 0) {
    //             return res.status(404).json({ message: 'No transactions found for the sender.' });
    //         }
    
    //         // Respond with the retrieved transactions
    //         res.status(200).json(transactions);
    //     } catch (error) {
    //         // Handle errors properly
    //         console.error('Error fetching split transactions by sender:', error);
    //         res.status(500).json({ message: 'Internal server error.' });
    //     }
    // },
    
    // async getSplitTransactionsBySender(req, res) {
    //     try {
    //         const { userId } = req.params; // Assuming userId is passed as a parameter in the request
    
    //         const transactions = await splitTransactionService.getSplitTransactionsBySender(userId);
    //         res.status(200).json(transactions);
    //     } catch (error) {
    //         res.status(400).send(error);
    //     }
    // },
    // async groupSplitTransactionsByEdge(req, res) {
    //     try {
    //         const aggregatedTransactions = await splitTransactionService.groupSplitTransactionsByEdge();
    //         res.json(aggregatedTransactions);
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // }

}

module.exports = TransactionController;