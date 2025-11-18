const Category = require("../models/Category");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
    try {
        // create base slug
        let baseSlug = slugify(req.body.name, { lower: true, strict: true });
        let slug = baseSlug;

        // check duplicates
        let category = await Category.findOne({ slug });
        let counter = 1;

        while (category) {
            slug = `${baseSlug}-${counter}`;
            category = await Category.findOne({ slug });
            counter++;
        }

        const data = {
            name: req.body.name,
            slug: slug
        };

        const newCategory = await Category.create(data);

        res.json({
            success: true,
            message: "Category created",
            category: newCategory
        });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.json({ success: true, categories });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};
