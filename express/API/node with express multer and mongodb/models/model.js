const mongoose = require( 'mongoose' )

const sampleSchema = mongoose.Schema( {
    name: {
        type: String,
        required: [true, "Field can not be empty"],
        unique: true
    },
    location: {
        type: String,
        required: [true, "Field can not be empty"]
    },
    createBy: {
        type: String,
        default: "Ubani Friday"
    },
    image: {
        type: String,
    },
    createAt: {
        type: Date,
        default: new Date()
    }
});

const sampleModel = mongoose.model('fillingStation', sampleSchema)

module.exports = sampleModel;