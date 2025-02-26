import Command from "../Models/commandModel.js";
import Product from "../Models/productModel.js"; 

// export const createCommand = async (req, res) => {
//   try {
//     console.log(req.body);
//     const { user, products, prixTotale } = req.body;

 
//     const Commands = await Command.create({ user, products, prixTotale })
//     res.status(201).json(Commands);
//   } catch (error) {
//     res.status(500).json( error.message );
//   }
// };

export const createCommand = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { user, products, prixTotale } = req.body;

    if (!user || !products || !prixTotale) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Extract product IDs from request
    const productIds = products.map(p => p.product);
    
    // Validate if products exist
    const existingProducts = await Product.find({ _id: { $in: productIds } });

    if (existingProducts.length !== products.length) {
      return res.status(400).json({ message: "One or more products not found" });
    }

    const command = await Command.create({ user, products, prixTotale });

    console.log("Command created:", command);
    res.status(201).json(command);
  } catch (error) {
    console.error("Error creating command:", error);
    res.status(500).json({ message: error.message });
  }
};

// export const getCommands = async (req, res) => {
//   try {
//     const Commands = await Command.find().populate("user")
//     res.status(200).json(Commands);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
export const getCommands = async (req, res) => {
  try {
    // Fetch commands and populate the user and product details
    const commands = await Command.find()
      .populate("user") // Populate user details
      .populate("products.product"); // Populate product details

    // Map over commands and format them as per the required structure
    const formattedCommands = commands.map(command => ({
      idCommand: command._id,
      userName: command.user ? command.user.name : "Unknown User", // Assuming the user document has a 'name' field
      numberOfProducts: command.products.length, // Get the number of products
      prixTotal: command.prixTotale,
      status: command.status,
    }));

    res.status(200).json(formattedCommands); // Return the formatted commands
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Get command details
export const getCommandDetails = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de la commande depuis les paramètres de l'URL

  try {
    // Rechercher la commande par ID dans la base de données
    const command = await Command.findById(id)
      .populate("user", "name") // Vous pouvez ajouter les champs à populater si nécessaire
      .populate("products.product", "name price"); // Populer les produits avec seulement les champs nécessaires (nom, prix)
    
    if (!command) {
      return res.status(404).json({ message: "Command not found" });
    }

    // Retourner les détails de la commande
    res.status(200).json(command);
  } catch (error) {
    console.error("Error retrieving command details:", error);
    res.status(500).json({ message: "Error retrieving command details" });
  }
};





export const getCommandById = async (req, res) => {
  try {
    const Command = await Command.findById(req.params.id);
    if (!Command) {
      return res.status(404).json({ message: "Command not found" });
    }
    res.status(200).json(Command);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCommand = async (req, res) => {
  try {
    const { user, products, prixTotale } = req.body;
    const updatedCommand = await Command.findByIdAndUpdate(
      req.params.id,
      { user, products, prixTotale },
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
export const updateCommandStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedCommand = await Command.findByIdAndUpdate(
      req.params.id,
      { status },
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

