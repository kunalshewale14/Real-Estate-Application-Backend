// Property controller – CRUD operation routes
// req.userId is set by auth middleware, so only the owner can create / edit / delete

const Property = require("../models/propertyModel");

// list & search the properties
exports.listProperties = async (req, res) => {
  try {
    const search = req.query.q || "";
    const regex  = new RegExp(search, "i");             
    const query  = { $or: [{ title: regex }, { location: regex }] };

    const properties = await Property
      .find(query)
      .populate("owner", "firstName lastName");

    res.json({ properties });
  } catch (err) {
    console.error("Failed to list properties:", err);
    res.status(500).json({ error: "Could not fetch properties." });
  }
};

//create the property 
exports.createProperty = async (req, res) => {
  try {
    const { title, description, location, price, availability } = req.body;

    const newProperty = await Property.create({
      owner: req.userId,
      title,
      description,
      location,
      price,
      availability
    });

    res.status(201).json({ property: newProperty });
  } catch (err) {
    console.error("Failed to create property:", err);
    res.status(500).json({ error: "Could not create property." });
  }
};

//get single for (view / edit) the property 
exports.getOne = async (req, res) => {
  try {
    const property = await Property.findOne({
      _id:   req.params.id,
      owner: req.userId
    });

    if (!property) {
      return res.status(404).json({ error: "Property not found." });
    }

    res.json({ property });
  } catch (err) {
    console.error("Failed to fetch property:", err);
    res.status(500).json({ error: "Could not fetch property." });
  }
};

//update the property 
exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, price, availability } = req.body;

    const updated = await Property.findOneAndUpdate(
      { _id: id, owner: req.userId },
      { title, description, location, price, availability },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Property not found or not yours." });
    }

    res.json({ property: updated });
  } catch (err) {
    console.error("Failed to update property:", err);
    res.status(500).json({ error: "Could not update property." });
  }
};

//delete the property 
exports.deleteProperty = async (req, res) => {
  try {
    const result = await Property.deleteOne({
      _id: req.params.id,
      owner: req.userId
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Property not found or not yours." });
    }

    res.sendStatus(204);   // deleted, no content
  } catch (err) {
    console.error("Failed to delete property:", err);
    res.status(500).json({ error: "Could not delete property." });
  }
};
