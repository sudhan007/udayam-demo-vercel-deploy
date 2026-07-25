import { sendMail } from "./email"

// Helper to format dates nicely in templates
const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

// Helper to format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount)
}

/**
 * Standard styles for premium HTML email template wrapper
 */
const emailWrapper = (contentHtml: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Udayam International</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }
        .header {
            background-color: #0f172a;
            color: #ffffff;
            padding: 24px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 20px;
            font-weight: 800;
            letter-spacing: 0.05em;
        }
        .content {
            padding: 32px 24px;
        }
        .card {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            margin: 24px 0;
        }
        .card-title {
            font-size: 14px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 12px;
            border-bottom: 1px dashed #cbd5e1;
            padding-bottom: 8px;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
        }
        .detail-row:last-child {
            margin-bottom: 0;
        }
        .detail-label {
            color: #64748b;
            font-weight: 500;
        }
        .detail-value {
            color: #0f172a;
            font-weight: 600;
            text-align: right;
        }
        .highlight {
            font-size: 18px;
            font-weight: 800;
            color: #0284c7;
        }
        .footer {
            background-color: #f1f5f9;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
        }
        .footer p {
            margin: 4px 0;
        }
        .btn {
            display: inline-block;
            background-color: #0f172a;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            margin-top: 16px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>UDAYAM INTERNATIONAL</h1>
        </div>
        <div class="content">
            ${contentHtml}
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Udayam International. All rights reserved.</p>
            <p>If you have any questions, please contact our support team.</p>
        </div>
    </div>
</body>
</html>
`

/**
 * Triggers confirmation email when a standard booking is paid & confirmed
 */
export const sendStandardBookingEmail = async (booking: any) => {
    const traveller = booking.travellerInfo
    const pkg = booking.packageId
    const price = booking.pricingDetails

    const htmlContent = `
        <h2 style="margin-top: 0; font-size: 22px; color: #0f172a;">Booking Confirmed! 🎉</h2>
        <p>Dear <strong>${traveller.fullName}</strong>,</p>
        <p>Thank you for choosing Udayam International. We are pleased to confirm your tour booking. Below are your travel itinerary and booking details:</p>
        
        <div class="card">
            <div class="card-title">Booking Information</div>
            <div class="detail-row">
                <span class="detail-label">Booking ID:</span>
                <span class="detail-value" style="font-family: monospace; font-size: 15px;">${booking.bookingNumber}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Tour Package:</span>
                <span class="detail-value">${pkg?.title || "Tour Package"}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Destination:</span>
                <span class="detail-value">📍 ${pkg?.destination || "-"}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Travel Date:</span>
                <span class="detail-value">📅 ${formatDate(traveller.travelDate)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">No. of Persons:</span>
                <span class="detail-value">👥 ${traveller.numberOfPersons} Traveller(s)</span>
            </div>
            <div class="detail-row" style="margin-top: 14px; border-top: 1px solid #e2e8f0; padding-top: 10px;">
                <span class="detail-label" style="font-size: 16px; font-weight: 700; color: #0f172a;">Total Paid:</span>
                <span class="detail-value highlight">${formatCurrency(price.finalAmount)}</span>
            </div>
        </div>

        <div class="card">
            <div class="card-title">Primary Contact Details</div>
            <div class="detail-row">
                <span class="detail-label">Contact Name:</span>
                <span class="detail-value">${traveller.fullName}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${traveller.email}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Mobile Number:</span>
                <span class="detail-value">${traveller.mobileNumber}</span>
            </div>
        </div>

        <p>A travel consultant will reach out to you shortly with hotel details, flight info (if applicable), and your final tour vouchers.</p>
        <p>Have an amazing journey!</p>
    `

    const bodyHtml = emailWrapper(htmlContent)

    return sendMail({
        to: traveller.email,
        subject: `Booking Confirmed - ${booking.bookingNumber} | Udayam International`,
        html: bodyHtml,
        text: `Dear ${traveller.fullName}, Your booking ${booking.bookingNumber} for ${pkg?.title || "Tour Package"} on ${formatDate(traveller.travelDate)} has been confirmed! Total Paid: ${formatCurrency(price.finalAmount)}.`
    })
}

/**
 * Triggers confirmation email when a customized package enquiry is submitted
 */
export const sendCustomizedEnquiryEmail = async (booking: any) => {
    const traveller = booking.travellerInfo
    const pkg = booking.packageId

    const htmlContent = `
        <h2 style="margin-top: 0; font-size: 22px; color: #0f172a;">Enquiry Received ✈️</h2>
        <p>Dear <strong>${traveller.fullName}</strong>,</p>
        <p>Thank you for reaching out to Udayam International. We have successfully received your customized holiday enquiry. Our travel experts are already crafting the perfect itinerary for you!</p>
        
        <div class="card">
            <div class="card-title">Enquiry Summary</div>
            <div class="detail-row">
                <span class="detail-label">Enquiry Reference:</span>
                <span class="detail-value" style="font-family: monospace; font-size: 15px;">${booking.bookingNumber}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Requested Tour:</span>
                <span class="detail-value">${pkg?.title || "Custom Tour"}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Destination:</span>
                <span class="detail-value">📍 ${pkg?.destination || "-"}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Travel Date:</span>
                <span class="detail-value">📅 ${formatDate(traveller.travelDate)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">No. of Persons:</span>
                <span class="detail-value">👥 ${traveller.numberOfPersons} Person(s)</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Travel Style:</span>
                <span class="detail-value">${traveller.travelType}</span>
            </div>
        </div>

        ${traveller.specialRequests ? `
        <div class="card">
            <div class="card-title">Special Requests / Notes</div>
            <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #334155;">${traveller.specialRequests}</p>
        </div>
        ` : ""}

        <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 16px; margin: 24px 0; font-size: 14px; color: #0369a1; font-weight: 500;">
            ℹ️ What's next? One of our travel consultants will connect with you within the next 24-48 hours to share the customized quote and fine-tune details to your liking.
        </div>

        <p>We look forward to planning an unforgettable holiday experience for you!</p>
    `

    const bodyHtml = emailWrapper(htmlContent)

    return sendMail({
        to: traveller.email,
        subject: `Enquiry Received - ${booking.bookingNumber} | Udayam International`,
        html: bodyHtml,
        text: `Dear ${traveller.fullName}, We have received your customised package enquiry ${booking.bookingNumber} for ${pkg?.title || "Custom Tour"}. Our team will contact you shortly with a personalized quote.`
    })
}
