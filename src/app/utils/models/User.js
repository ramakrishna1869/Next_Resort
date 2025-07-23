const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    bookings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Booking'
    }]
})

const UserModel = mongoose.models.User || mongoose.model('User', userSchema)

export default UserModel