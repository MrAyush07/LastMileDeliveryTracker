const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendOrderConfirmation = async (to, trackingId) => {

    await transporter.sendMail({

        from: process.env.EMAIL,

        to,

        subject: "Order Created Successfully",

        html: `
            <h2>Last Mile Delivery Tracker</h2>

            <p>Your order has been created successfully.</p>

            <h3>Tracking ID:</h3>

            <h2>${trackingId}</h2>

            <p>Please save this Tracking ID for future tracking.</p>
        `
    });

};

module.exports = {
    sendOrderConfirmation
};