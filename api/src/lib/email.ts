import { APP_CONSTANTS } from "../constant"

let transporter: any = null

const getTransporter = async () => {
    if (transporter) return transporter

    const user = APP_CONSTANTS.EMAIL_USER
    const pass = APP_CONSTANTS.EMAIL_APP_PASSWORD

    if (!user || !pass) {
        console.warn("Nodemailer: EMAIL_USER or EMAIL_APP_PASSWORD not configured. Emails will be logged to console.")
        return null
    }

    try {
        // @ts-ignore
        const nodemailerModule = await import("nodemailer")
        const nodemailer = nodemailerModule.default || nodemailerModule
        transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user,
                pass,
            },
        })
        return transporter
    } catch (err) {
        console.warn("Nodemailer package could not be resolved. Falling back to mock console logger.")
        return null
    }
}

export interface SendMailOptions {
    to: string
    subject: string
    html: string
    text?: string
}

/**
 * Generic utility to send emails throughout the project.
 * Uses NodeMailer Gmail SMTP when environment variables are set and package is available,
 * otherwise falls back to logging the email contents to the console.
 */
export const sendMail = async (options: SendMailOptions) => {
    const fromAddress = APP_CONSTANTS.EMAIL_USER || "no-reply@udayaminternational.com"
    const mailOptions = {
        from: `"Udayam International" <${fromAddress}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || "",
    }

    const tx = await getTransporter()

    if (!tx) {
        console.log("=== [EMAIL LOG (MOCK)] ===")
        console.log(`From: ${mailOptions.from}`)
        console.log(`To: ${mailOptions.to}`)
        console.log(`Subject: ${mailOptions.subject}`)
        console.log(`Text Body: ${mailOptions.text}`)
        console.log(`HTML Body:\n${mailOptions.html}`)
        console.log("==========================")
        return { success: true, messageId: "mock-msg-id-" + Date.now() }
    }

    try {
        const info = await tx.sendMail(mailOptions)
        console.log("Email sent successfully. Message ID:", info.messageId)
        return { success: true, messageId: info.messageId }
    } catch (error) {
        console.error("Failed to send email via NodeMailer:", error)
        return { success: false, error }
    }
}
