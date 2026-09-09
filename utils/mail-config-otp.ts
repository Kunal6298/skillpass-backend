import nodemailer from 'nodemailer';

interface SendOTPEmailParams {
    email: string;
    otp: string;
}

async function sendOTPEmail({ email, otp }: SendOTPEmailParams): Promise<void> {
    console.log("Sending OTP email to:", otp);

    const emailUser = process.env.EMAIL_USER || 'mail@skillpass.org';
    const mailPass = process.env.MAIL_PASS || process.env.EMAIL_PASS || '';

    // If no password provided, log and return early without hanging
    if (!mailPass) {
        console.warn("MAIL_PASS not configured. Skipping SMTP send. OTP is:", otp);
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.zoho.in',
        port: Number(process.env.EMAIL_PORT) || 465,
        secure: process.env.EMAIL_SECURE !== 'false',
        connectionTimeout: 6000,
        greetingTimeout: 6000,
        socketTimeout: 6000,
        auth: {
            user: emailUser,
            pass: mailPass,
        },
    });

    await transporter.sendMail({
        from: `"Skillpass" <${emailUser}>`,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    });
}

export { sendOTPEmail };
