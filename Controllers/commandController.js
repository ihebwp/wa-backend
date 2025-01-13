import Command from "../Models/commandModel.js";

export const createCommand = async (req, res) => {
  try {
    console.log(req.body);
    const { user, products, prixTotale } = req.body;

 
    const Commands = await Command.create({ user, products, prixTotale })
    res.status(201).json(Commands);
  } catch (error) {
    res.status(500).json( error.message );
  }
};

export const getCommands = async (req, res) => {
  try {
    const Commands = await Command.find().populate("user")
    res.status(200).json(Commands);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCommandById = async (req, res) => {
  try {
    const Commands = await Command.findById(req.params.id);
    if (!Command) {
      return res.status(404).json({ message: "Command not found" });
    }
    res.status(200).json(Commands);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCommand = async (req, res) => {
  try {
    const { user, Commande, prixTotale } = req.body;
    const updatedCommand = await Command.findByIdAndUpdate(
      req.params.id,
      { user, Commande, prixTotale },
      { new: true }
    );
    if (!updatedCommand) {
      return res.status(404).json({ message: "Command not found" });
    }
    res.status(200).json(updatedCommand);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCommand = async (req, res) => {
  try {
    const deletedCommand = await Command.findByIdAndDelete(req.params.id);
    if (!deletedCommand) {
      return res.status(404).json({ message: "Command not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
