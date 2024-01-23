const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Company Name is required']
    },
    title: {
        type: String,
        required: [true, 'Please add title for the job']
    },
    description: {
        type: String,
        required: [true , 'Please add job description']
    },
    logoUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Job' , jobSchema);