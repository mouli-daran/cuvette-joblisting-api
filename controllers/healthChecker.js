exports.health = (req , res) => {
    res.status(200).json({
        service: "Job Listing Platform",
        status: "Active",
        date: new Date()
    })
};

