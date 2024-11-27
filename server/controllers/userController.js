const { console } = require('inspector');
const User = require('../models/userModel');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error });
        }
    },
    addUser: async (req, res) => {
        try {
            const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Save the image path
            const userData = { ...req.body, image: imagePath };
            const user = await User.add(userData);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: `Error inserting user : ${error.message || 'Validation error occurred'}`,
                details: error.errors || {},});
        }
    },
    updateUser: async (req, res) => {
        try {
            const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Save the image path
            const userData = { ...req.body, image: imagePath };
            // const id = req.params.id;
            const user = await User.update(userData );
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: `Error updating user: ${error.message || 'Validation error occurred'}`, error });
        }
    },
    deleteUser: async (req, res) => {
        try {
            await User.delete(req.params.id);
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: `Error deleting user: ${error.message || 'Unexpected error occurred'}`, error });
        }
    },
};

module.exports = userController;