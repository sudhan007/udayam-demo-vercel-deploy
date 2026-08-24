import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer"

// ── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    padding: 0,
  },

  // Header
  header: {
    backgroundColor: "#0F1B47",
    padding: "28 36",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "column",
  },
  brandName: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  brandTagline: {
    fontSize: 8,
    color: "#A0AEC0",
    marginTop: 3,
    letterSpacing: 0.3,
  },
  headerRight: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  invoiceTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#F6AD55",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  bookingNumber: {
    fontSize: 9,
    color: "#CBD5E0",
    marginTop: 3,
    fontFamily: "Helvetica",
  },

  // Body wrapper
  body: {
    padding: "24 36",
    flexDirection: "column",
    gap: 18,
  },

  // Status row
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F7FAFC",
    borderRadius: 8,
    padding: "12 16",
    border: "1 solid #E2E8F0",
  },
  statusLabel: {
    fontSize: 8,
    color: "#718096",
    fontFamily: "Helvetica",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  statusValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#1A202C",
    marginTop: 3,
  },
  statusBadgeBooked: {
    backgroundColor: "#C6F6D5",
    color: "#22543D",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  statusBadgeEnquiry: {
    backgroundColor: "#FEFCBF",
    color: "#744210",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  statusBadgeCancelled: {
    backgroundColor: "#FED7D7",
    color: "#742A2A",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  statusBadgeDefault: {
    backgroundColor: "#EBF4FF",
    color: "#2B4C7E",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },

  // Section
  section: {
    flexDirection: "column",
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#0F1B47",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    paddingBottom: 5,
    borderBottom: "1 solid #E2E8F0",
  },
  grid2: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 0,
  },
  gridCell: {
    width: "50%",
    padding: "6 0",
  },
  gridCellLabel: {
    fontSize: 8,
    color: "#718096",
    fontFamily: "Helvetica",
    marginBottom: 2,
  },
  gridCellValue: {
    fontSize: 9.5,
    color: "#1A202C",
    fontFamily: "Helvetica-Bold",
  },

  // Travellers table
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#EBF4FF",
    padding: "6 10",
    borderRadius: 4,
    marginBottom: 2,
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#2B4C7E",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    padding: "6 10",
    borderBottom: "1 solid #F7FAFC",
  },
  tableCell: {
    fontSize: 9,
    color: "#2D3748",
    fontFamily: "Helvetica",
  },
  col1: { width: "8%" },
  col2: { width: "42%" },
  col3: { width: "20%" },
  col4: { width: "30%" },

  // Pricing
  pricingBox: {
    backgroundColor: "#F7FAFC",
    border: "1 solid #E2E8F0",
    borderRadius: 8,
    padding: "12 16",
  },
  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottom: "1 solid #EDF2F7",
  },
  pricingRowLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    marginTop: 4,
    borderTop: "1.5 solid #1B2B6B",
  },
  pricingLabel: {
    fontSize: 9,
    color: "#4A5568",
    fontFamily: "Helvetica",
  },
  pricingValue: {
    fontSize: 9,
    color: "#1A202C",
    fontFamily: "Helvetica-Bold",
  },
  pricingLabelTotal: {
    fontSize: 10,
    color: "#0F1B47",
    fontFamily: "Helvetica-Bold",
  },
  pricingValueTotal: {
    fontSize: 11,
    color: "#1B2B6B",
    fontFamily: "Helvetica-Bold",
  },
  discountValue: {
    fontSize: 9,
    color: "#276749",
    fontFamily: "Helvetica-Bold",
  },

  // Payment details
  paymentBox: {
    backgroundColor: "#F0FFF4",
    border: "1 solid #C6F6D5",
    borderRadius: 8,
    padding: "12 16",
    flexDirection: "column",
    gap: 4,
  },
  paymentRow: {
    flexDirection: "row",
    gap: 8,
  },
  paymentKey: {
    fontSize: 8,
    color: "#276749",
    fontFamily: "Helvetica-Bold",
    width: 110,
  },
  paymentVal: {
    fontSize: 8,
    color: "#22543D",
    fontFamily: "Helvetica",
    flex: 1,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 4,
  },

  // Footer
  footer: {
    backgroundColor: "#F7FAFC",
    borderTop: "1 solid #E2E8F0",
    padding: "14 36",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  footerLeft: {
    flexDirection: "column",
    gap: 2,
  },
  footerText: {
    fontSize: 7.5,
    color: "#718096",
    fontFamily: "Helvetica",
  },
  footerBrand: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#0F1B47",
    marginBottom: 2,
  },
  footerRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 2,
  },
  generatedText: {
    fontSize: 7,
    color: "#A0AEC0",
    fontFamily: "Helvetica",
  },
})

// ── Helpers ─────────────────────────────────────────────────────────────────

const fmtDate = (d?: string) => {
  if (!d) return "—"
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

const fmtAmount = (n?: number) => {
  if (n === undefined || n === null) return "—"
  return `Rs. ${n.toLocaleString("en-IN")}`
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case "BOOKED":
    case "COMPLETED":
      return styles.statusBadgeBooked
    case "CANCELLED":
    case "PAYMENT_FAILED":
    case "REFUNDED":
      return styles.statusBadgeCancelled
    case "ENQUIRY_RECEIVED":
    case "QUOTATION_SHARED":
      return styles.statusBadgeEnquiry
    default:
      return styles.statusBadgeDefault
  }
}

const cleanStatus = (s: string) => s.replace(/_/g, " ")

const cleanTravelType = (s?: string): string => {
  if (!s) return "—"
  return (
    s
      .replace(/[^A-Za-z0-9]/g, " ") // non-alphanumeric → space (strips all emoji/ZWJ/underscores)
      .replace(/\s+/g, " ") // collapse whitespace runs
      .trim() || "—"
  )
}

// ── PDF Document ─────────────────────────────────────────────────────────────

interface BookingInvoicePDFProps {
  booking: any
}

export const BookingInvoicePDF = ({ booking }: BookingInvoicePDFProps) => {
  const pkg = booking?.packageId
  const travInfo = booking?.travellerInfo
  const pricing = booking?.pricingDetails
  const payment = booking?.paymentId

  return (
    <Document
      title={`Booking Invoice - ${booking?.bookingNumber}`}
      author="Udayam International"
      subject="Travel Booking Invoice"
    >
      <Page size="A4" style={styles.page}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.brandName}>UDAYAM INTERNATIONAL</Text>
            <Text style={styles.brandTagline}>
              Your Trusted Travel Partner • Est. 2020
            </Text>
            <Text style={[styles.brandTagline, { marginTop: 6 }]}>
              info@udayaminternational.com • +91 72997 71111
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.invoiceTitle}>Booking Invoice</Text>
            <Text style={styles.bookingNumber}>{booking?.bookingNumber}</Text>
            <Text style={[styles.bookingNumber, { marginTop: 4 }]}>
              Issued: {fmtDate(booking?.createdAt)}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* ── Status Row ── */}
          <View style={styles.statusRow}>
            <View>
              <Text style={styles.statusLabel}>Booking Status</Text>
              <Text style={styles.statusValue}>
                {cleanStatus(booking?.status || "—")}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.statusLabel}>Package Type</Text>
                <Text style={[styles.statusValue, { fontSize: 9 }]}>
                  {booking?.bookingType === "CUSTOMIZED"
                    ? "Customized Tour"
                    : "Standard Package"}
                </Text>
              </View>
              <Text style={getStatusStyle(booking?.status)}>
                {cleanStatus(booking?.status || "—")}
              </Text>
            </View>
          </View>

          {/* ── Package Details ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Package Details</Text>
            <View style={styles.grid2}>
              <View style={styles.gridCell}>
                <Text style={styles.gridCellLabel}>Package Name</Text>
                <Text style={styles.gridCellValue}>
                  {pkg?.title || "Custom Travel Package"}
                </Text>
              </View>
              <View style={styles.gridCell}>
                <Text style={styles.gridCellLabel}>Destination</Text>
                <Text style={styles.gridCellValue}>
                  {pkg?.destination || "Multi-Destination"}
                </Text>
              </View>
              <View style={styles.gridCell}>
                <Text style={styles.gridCellLabel}>Package Category</Text>
                <Text style={styles.gridCellValue}>
                  {pkg?.packageType || "—"}
                </Text>
              </View>
              {pkg?.days && (
                <View style={styles.gridCell}>
                  <Text style={styles.gridCellLabel}>Duration</Text>
                  <Text style={styles.gridCellValue}>
                    {pkg.days} Days / {pkg.nights} Nights
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.divider} />

          {/* ── Primary Traveller Info ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Primary Traveller &amp; Contact
            </Text>
            <View style={styles.grid2}>
              <View style={styles.gridCell}>
                <Text style={styles.gridCellLabel}>Full Name</Text>
                <Text style={styles.gridCellValue}>
                  {travInfo?.fullName || "—"}
                </Text>
              </View>
              <View style={styles.gridCell}>
                <Text style={styles.gridCellLabel}>Mobile Number</Text>
                <Text style={styles.gridCellValue}>
                  {travInfo?.mobileNumber || "—"}
                </Text>
              </View>
              <View style={styles.gridCell}>
                <Text style={styles.gridCellLabel}>Email Address</Text>
                <Text style={styles.gridCellValue}>
                  {travInfo?.email || "—"}
                </Text>
              </View>
              <View style={styles.gridCell}>
                <Text style={styles.gridCellLabel}>Travel Date</Text>
                <Text style={styles.gridCellValue}>
                  {fmtDate(travInfo?.travelDate)}
                </Text>
              </View>
              <View style={styles.gridCell}>
                <Text style={styles.gridCellLabel}>Trip Style</Text>
                <Text style={styles.gridCellValue}>
                  {cleanTravelType(travInfo?.travelType)}
                </Text>
              </View>
              <View style={styles.gridCell}>
                <Text style={styles.gridCellLabel}>Total Travellers</Text>
                <Text style={styles.gridCellValue}>
                  {travInfo?.numberOfPersons || 1} Pax
                </Text>
              </View>
              {travInfo?.specialRequests && (
                <View style={[styles.gridCell, { width: "100%" }]}>
                  <Text style={styles.gridCellLabel}>Special Requests</Text>
                  <Text style={styles.gridCellValue}>
                    {travInfo.specialRequests}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* ── Travellers Breakdown ── */}
          {travInfo?.travellers?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Traveller Details ({travInfo.travellers.length} Persons)
              </Text>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderCell, styles.col1]}>#</Text>
                <Text style={[styles.tableHeaderCell, styles.col2]}>Name</Text>
                <Text style={[styles.tableHeaderCell, styles.col3]}>Age</Text>
                <Text style={[styles.tableHeaderCell, styles.col4]}>
                  Gender
                </Text>
              </View>
              {travInfo.travellers.map((t: any, idx: number) => (
                <View
                  key={idx}
                  style={[
                    styles.tableRow,
                    {
                      backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F7FAFC",
                    },
                  ]}
                >
                  <Text style={[styles.tableCell, styles.col1]}>{idx + 1}</Text>
                  <Text style={[styles.tableCell, styles.col2]}>
                    {t.name || "Traveller"}
                  </Text>
                  <Text style={[styles.tableCell, styles.col3]}>
                    {t.age} yrs
                  </Text>
                  <Text style={[styles.tableCell, styles.col4]}>
                    {t.gender}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.divider} />

          {/* ── Pricing Summary ── */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Payment &amp; Pricing Summary
            </Text>
            <View style={styles.pricingBox}>
              {pricing?.originalAmount > 0 && (
                <View style={styles.pricingRow}>
                  <Text style={styles.pricingLabel}>Base Price</Text>
                  <Text style={styles.pricingValue}>
                    {fmtAmount(pricing.originalAmount)}
                  </Text>
                </View>
              )}
              {pricing?.discountAmount > 0 && (
                <View style={styles.pricingRow}>
                  <Text style={styles.pricingLabel}>Coupon Discount</Text>
                  <Text style={styles.discountValue}>
                    - {fmtAmount(pricing.discountAmount)}
                  </Text>
                </View>
              )}
              {pricing?.gstAmount > 0 && (
                <View style={styles.pricingRow}>
                  <Text style={styles.pricingLabel}>GST ({pricing.gstPercentage}%)</Text>
                  <Text style={styles.pricingValue}>
                    + {fmtAmount(pricing.gstAmount)}
                  </Text>
                </View>
              )}
              <View style={styles.pricingRowLast}>
                <Text style={styles.pricingLabelTotal}>
                  {pricing?.finalAmount > 0 ? "Total Amount Paid" : "Amount"}
                </Text>
                <Text style={styles.pricingValueTotal}>
                  {pricing?.finalAmount > 0
                    ? fmtAmount(pricing.finalAmount)
                    : "Custom Quotation"}
                </Text>
              </View>
              {pricing?.currency && (
                <Text
                  style={[
                    styles.pricingLabel,
                    { marginTop: 4, fontSize: 7.5, color: "#A0AEC0" },
                  ]}
                >
                  Currency: {pricing.currency}
                </Text>
              )}
            </View>
          </View>

          {/* ── Payment Details ── */}
          {payment && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Transaction Details</Text>
              <View style={styles.paymentBox}>
                {payment.razorpayOrderId && (
                  <View style={styles.paymentRow}>
                    <Text style={styles.paymentKey}>Order ID</Text>
                    <Text style={styles.paymentVal}>
                      {payment.razorpayOrderId}
                    </Text>
                  </View>
                )}
                {payment.razorpayPaymentId && (
                  <View style={styles.paymentRow}>
                    <Text style={styles.paymentKey}>Payment ID</Text>
                    <Text style={styles.paymentVal}>
                      {payment.razorpayPaymentId}
                    </Text>
                  </View>
                )}
                {payment.status && (
                  <View style={styles.paymentRow}>
                    <Text style={styles.paymentKey}>Payment Status</Text>
                    <Text style={styles.paymentVal}>{payment.status}</Text>
                  </View>
                )}
                {payment.createdAt && (
                  <View style={styles.paymentRow}>
                    <Text style={styles.paymentKey}>Payment Date</Text>
                    <Text style={styles.paymentVal}>
                      {fmtDate(payment.createdAt)}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Booking History note for enquiries */}
          {booking?.bookingType === "CUSTOMIZED" &&
            booking?.status === "ENQUIRY_RECEIVED" && (
              <View
                style={{
                  backgroundColor: "#FFFBEB",
                  border: "1 solid #F6E05E",
                  borderRadius: 8,
                  padding: "10 14",
                }}
              >
                <Text
                  style={{
                    fontSize: 8.5,
                    color: "#744210",
                    fontFamily: "Helvetica-Bold",
                    marginBottom: 3,
                  }}
                >
                  Enquiry Acknowledgement
                </Text>
                <Text
                  style={{
                    fontSize: 8,
                    color: "#975A16",
                    fontFamily: "Helvetica",
                  }}
                >
                  Your customized tour enquiry has been received. Our team will
                  review your requirements and share a detailed quotation
                  shortly. Please retain this document as your enquiry
                  reference.
                </Text>
              </View>
            )}
        </View>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerBrand}>Udayam International</Text>
            <Text style={styles.footerText}>
              Kaniyaanvilai, Kanyakumari, Tamil Nadu, India
            </Text>
            <Text style={styles.footerText}>
              info@udayaminternational.com • +91 72997 71111
            </Text>
            <Text
              style={[styles.footerText, { marginTop: 4, color: "#A0AEC0" }]}
            >
              This is a computer-generated document. No signature required.
            </Text>
          </View>
          <View style={styles.footerRight}>
            <Text style={styles.generatedText}>
              Generated: {new Date().toLocaleString("en-IN")}
            </Text>
            <Text style={[styles.generatedText, { marginTop: 2 }]}>
              Ref: {booking?.bookingNumber}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default BookingInvoicePDF
