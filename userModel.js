import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email address");
                }
            },
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes("password")) {
                    throw new Error('Password should not contain "password"');
                }
            },
        },
        confirmPassword: {
            type: String,
            required: true,
            validate(value) {
                if (value !== this.password) {
                    throw new Error("Passwords do not match");
                }
            },
        },
        // This field stores the user's date of birth.
        dob: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female", "other"],
        },
        phoneNumber: {
            type: String,
            required: true,
            validate: {
                validator: function (val) {
                    return /^\d{10}$/.test(val);
                },
                message: "Phone number should be a 10-digit number",
            },
        },
        address: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            required: false,
        },
        paymentInformation: {
            cardNumber: {
                type: String,
                required: true,
                minlength: 16,
                maxlength: 16,
            },
            cardHolderName: {
                type: String,
                required: true,
            },
            expirationDate: {
                type: Date,
                required: true,
            },
            cvv: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 4,
            },
        },
        securityQuestions: {
            question1: {
                type: String,
                required: true,
            },
            answer1: {
                type: String,
                required: true,
            },
            question2: {
                type: String,
                required: true,
            },
            answer2: {
                type: String,
                required: true,
            },
        },
        //This field is a boolean that indicates whether the user has agreed to the terms and conditions or not.
        termsAndConditions: {
            type: Boolean,
            required: true,
        },
        // This field is a boolean that indicates whether the user has agreed to the privacy policy or not.
        privacyPolicy: {
            type: Boolean,
            required: true,
        },
        // This field is an array of strings that stores the user's interests or hobbies.
        interests: {
            type: [String],
            required: false,
        },
        //This field is an object that stores any identification information about the user, such as their passport number, driver's license number, etc.
        userIdentification: {
            type: String,
            required: true,
            unique: true,
        },
        //This field is an object that can store any additional information about the user that is not already captured by the other fields in the schema.
        additionalInfo: {
            type: String,
            required: false,
        },
        // This field is a boolean that indicates whether the user has administrative privileges or not.
        isAdmin: {
            type: Boolean,
            default: false,
        },
        // The tokens field is an array of tokens, which can be used for authentication and authorization purposes.
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    // can be used to automatically create and update fields in the document. Mongoose will automatically manage these fields for you.
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
