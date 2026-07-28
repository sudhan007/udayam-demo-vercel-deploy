import React from "react"

const f = "'Inter', sans-serif"

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "'Libre Baskerville', serif",
  fontSize: "1.05rem",
  fontWeight: 700,
  color: "#1B2B6B",
  marginTop: 28,
  marginBottom: 10,
}

const paragraphStyle: React.CSSProperties = {
  fontFamily: f,
  fontSize: ".92rem",
  lineHeight: 1.7,
  color: "#374151",
  marginBottom: 10,
}

const listStyle: React.CSSProperties = {
  fontFamily: f,
  fontSize: ".92rem",
  lineHeight: 1.7,
  color: "#374151",
  paddingLeft: "1.2rem",
  marginBottom: 10,
}

export const TourTermsAndConditions: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAF8F4",
        padding: "0 0 60px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0F1B47 0%, #1B2B6B 100%)",
          color: "#fff",
          padding: "36px 24px",
        }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div
            style={{
              fontFamily: f,
              fontSize: ".72rem",
              color: "#4ADE80",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              marginBottom: 8,
            }}
          >
            Udayam Holidays
          </div>
          <h1
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              margin: 0,
            }}
          >
            Tour Booking — Terms &amp; Conditions
          </h1>
          <p
            style={{
              fontFamily: f,
              fontSize: ".85rem",
              color: "rgba(255,255,255,0.75)",
              marginTop: 8,
            }}
          >
            Please read these terms carefully before confirming your booking.
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 12px 40px rgba(15,26,66,0.08)",
          padding: "32px 36px",
          marginTop: -24,
        }}
      >
        <h2 style={{ ...sectionTitleStyle, marginTop: 0 }}>
          1. Booking &amp; Payment
        </h2>
        <p style={paragraphStyle}>
          A booking is confirmed only after receipt of the applicable payment
          (full or partial, as specified for the package) and issuance of a
          booking confirmation number. Prices are subject to change until a
          booking is confirmed and paid for.
        </p>

        <h2 style={sectionTitleStyle}>2. Cancellations &amp; Refunds</h2>
        <ul style={listStyle}>
          <li>Cancellations made 15+ days before travel: 75% refund.</li>
          <li>Cancellations made 7–14 days before travel: 50% refund.</li>
          <li>Cancellations made less than 7 days before travel: no refund.</li>
          <li>
            Refunds, where applicable, are processed to the original payment
            method within 7–10 business days.
          </li>
        </ul>

        <h2 style={sectionTitleStyle}>3. Rescheduling</h2>
        <p style={paragraphStyle}>
          Travel dates may be rescheduled once, free of charge, subject to
          availability, provided the request is made at least 10 days before the
          original travel date. Subsequent changes may incur a rescheduling fee.
        </p>

        <h2 style={sectionTitleStyle}>4. Traveller Responsibilities</h2>
        <p style={paragraphStyle}>
          Travellers are responsible for ensuring all personal documents
          (identification, visas, medical certificates, etc.) are valid and
          carried for the duration of the trip. Udayam Holidays is not liable
          for denial of travel or entry due to invalid or missing documents.
        </p>

        <h2 style={sectionTitleStyle}>5. Itinerary Changes</h2>
        <p style={paragraphStyle}>
          While every effort is made to operate tours as advertised, the
          itinerary, accommodation, or transport arrangements may be modified
          due to weather, safety, local regulations, or circumstances beyond our
          control. Where possible, comparable alternatives will be provided.
        </p>

        <h2 style={sectionTitleStyle}>6. Customized Packages</h2>
        <p style={paragraphStyle}>
          For customized tour enquiries, submitting the enquiry form does not
          constitute a confirmed booking. A dedicated quote and itinerary will
          be shared separately, and the booking is confirmed only after mutual
          agreement and payment.
        </p>

        <h2 style={sectionTitleStyle}>7. Limitation of Liability</h2>
        <p style={paragraphStyle}>
          Udayam Holidays acts as an intermediary between travellers and
          third-party service providers (hotels, transport operators, activity
          vendors). We are not liable for loss, injury, delay, or damage arising
          from the acts or omissions of these third parties.
        </p>

        <h2 style={sectionTitleStyle}>8. Governing Law</h2>
        <p style={paragraphStyle}>
          These terms are governed by the laws of India, and any disputes shall
          be subject to the exclusive jurisdiction of the courts having
          jurisdiction over our registered office location.
        </p>

        <div
          style={{
            marginTop: 28,
            paddingTop: 16,
            borderTop: "1px solid #E8E4DC",
            fontFamily: f,
            fontSize: ".78rem",
            color: "#9494b0",
          }}
        >
          By checking "I agree to the Terms &amp; Conditions" during checkout,
          you confirm that you have read, understood, and accepted the terms
          outlined on this page.
        </div>
      </div>
    </div>
  )
}

export default TourTermsAndConditions
