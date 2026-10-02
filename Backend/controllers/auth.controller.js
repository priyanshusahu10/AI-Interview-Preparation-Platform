const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const blackListToken = require('../models/blacklist.model')
const nodemailer = require("nodemailer");
const Middleware = require('../middleware/auth.middleware')

const isProduction = process.env.NODE_ENV === "production";
const getCookieOptions = () => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

async function userRegister(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide username, email, and password"
            });
        }

        const isUserExist = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (isUserExist) {
            return res.status(400).json({
                message: isUserExist.email === email 
                    ? "Email is already registered" 
                    : "Username is already taken"
            });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username,
            email,
            password: hash
        });

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET || process.env.JWT_SCRETE || "default_jwt_secret"
        );

        res.cookie('token', token, getCookieOptions());

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({
            message: "Failed to register user. Please try again."
        });
    }
}

async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET || process.env.JWT_SCRETE || "default_jwt_secret"
        );

        res.cookie("token", token, getCookieOptions());

        return res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({
            message: "Failed to log in. Please try again."
        });
    }
}

async function logoutController(req, res) {
    const token = req.cookies?.token;

    if (token) {
        try {
            await blackListToken.create({ token });
        } catch (e) {
            // Token might already be blacklisted or db issue
        }
    }
     
    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax"
    });

    return res.status(200).json({
        message: "User Logout Successfully"
    });
}

async function getUser(req, res) {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User detail fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error("getUser error:", err);
        return res.status(500).json({
            message: "Failed to fetch user"
        });
    }
}


const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL, // Your email address
      replyTo: email,        // Clicking Reply replies to the sender
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Subject:</strong> ${subject}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    });

    res.status(200).json({
      message: "Message sent successfully!",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};




module.exports = {
    userRegister,
    loginController,
    logoutController,
    getUser,
    sendContactMessage

};