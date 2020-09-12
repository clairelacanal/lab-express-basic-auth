// User model here
const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "Nom d'utilisateur obligatoire"],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Mot de passe obligatoire']
    }
},
    
    {
  timestamps: true
    }
    
    
);

module.exports = model('User', userSchema);