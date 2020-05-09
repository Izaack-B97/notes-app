const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true , unique: true},
    password: { type: String, required: true }
},{ timestamps: true });

// Genera el HASH de contraseña
const generateHashPassword = plainPassword => {
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10));
  };
  
  // Modifica la contraseña aplicandole el hash de contraseña
  userSchema.pre("save", function (next) {
    try {
      let user = this;
  
      if (!user.isModified("password")) {
        return next();
      }
  
      user.password = generateHashPassword(user.password);
      next();
    } catch (error) {
      next(error);
    }
  });
  
  // Compara la contraseña original con la contraseña "HASEADA"
  // userSchema.methods.comparePassword = function (candidatePassword, hashPassword, cb) {
  //   bcrypt.compare(candidatePassword, hashPassword, function (err, isMatch) {
  
  //     if (err) {
  //       return cb(err);
  //     }
  //     cb(null, isMatch);
  //   });
  // };

  // Descincripta la contraseña
  userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
  };

  module.exports = model("users", userSchema);

