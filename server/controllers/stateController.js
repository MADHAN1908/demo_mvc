const { console } = require('inspector');
const State = require('../models/stateModel');

const stateController = {
    getAllStates: async (req, res) => {
        try {
            const states = await State.getAll();
            res.json(states);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching states', error });
        }
    },
    addState: async (req, res) => {
        try {
            
            const state = await State.add(req.body);
            res.json(state);
        } catch (error) {
            res.status(500).json({ message: `Error inserting state: ${error.message || 'Validation error occurred'}`, error });
        }
    },
    updateState: async (req, res) => {
        try {
            const state = await State.update(req.params.id, req.body);
            res.json(state);
        } catch (error) {
            res.status(500).json({ message: `Error updating state: ${error.message || 'Validation error occurred'}`, error });
        }
    },
    deleteState: async (req, res) => {
        try {
            await State.delete(req.params.id);
            res.json({ message: 'State deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: `Error deleting state: ${error.message || 'Unexpected error occurred'}`, error });
        }
    },
};

module.exports = stateController;