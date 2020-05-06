const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
},{ timestamps: true });

const User = model('User', userSchema);

// Cifra la comtraseña
userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.getSalt(10);
    return await bcrypt.hash(password, salt);
}

// Compara la contraseña con la de la bd
userSchema.methods.matchPassword = async function(password){
    await bcrypt.compare(password, this.password);
};

module.exports= User;