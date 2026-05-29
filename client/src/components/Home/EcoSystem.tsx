// "use client"

// import React, { useEffect, useRef } from "react"
// import TourismLogo from "../../assets/TourismLogo.jpeg"
// import Homelogo from "../../assets/home/HomeLogo.jpeg"
// import MedicalLogo from "../../assets/MedicalLogo.jpeg"
// import TradeLogo from "../../assets/TradeLogo.jpeg"
// import RecruitmentLogo from "../../assets/RecruitmentLogo.jpeg"
// import TravelLogo from "../../assets/TravelLogo.jpeg"
// import EducationLogo from "../../assets/EducationLogo.jpeg"
// const UdayamEcosystem: React.FC = () => {
//   const connectorRef = useRef<SVGSVGElement>(null)
//   const mapRef = useRef<HTMLDivElement>(null)

//   const drawConnectors = () => {
//     if (!connectorRef.current || window.innerWidth <= 768) return

//     const svg = connectorRef.current
//     const container = mapRef.current
//     if (!container) return

//     svg.innerHTML = ""

//     const hub = document.getElementById("hubCenter") as HTMLDivElement
//     const cards = {
//       wings: document.getElementById("cardWings"),
//       holidays: document.getElementById("cardHolidays"),
//       pathways: document.getElementById("cardPathways"),
//       placements: document.getElementById("cardPlacements"),
//       commerce: document.getElementById("cardCommerce"),
//       tnc: document.getElementById("cardTnc"),
//     }

//     const containerRect = container.getBoundingClientRect()
//     const hubRect = hub.getBoundingClientRect()
//     const hubCX = hubRect.left - containerRect.left + hubRect.width / 2
//     const hubCY = hubRect.top - containerRect.top + hubRect.height / 2

//     const getCardCenter = (el: HTMLElement) => {
//       const r = el.getBoundingClientRect()
//       return {
//         x: r.left - containerRect.left + r.width / 2,
//         y: r.top - containerRect.top + r.height / 2,
//       }
//     }

//     const addLine = (
//       x1: number,
//       y1: number,
//       x2: number,
//       y2: number,
//       delay: number
//     ) => {
//       const line = document.createElementNS(
//         "http://www.w3.org/2000/svg",
//         "line"
//       )
//       line.setAttribute("x1", x1.toString())
//       line.setAttribute("y1", y1.toString())
//       line.setAttribute("x2", x2.toString())
//       line.setAttribute("y2", y2.toString())
//       line.setAttribute("stroke", "rgba(27,43,107,0.14)")
//       line.setAttribute("stroke-width", "1.5")
//       line.setAttribute("stroke-dasharray", "5 7")
//       line.style.animation = `dashFlow 3s linear infinite`
//       line.style.animationDelay = `${delay}s`
//       svg.appendChild(line)
//       ;[
//         { x: x1, y: y1 },
//         { x: x2, y: y2 },
//       ].forEach((pt) => {
//         const circle = document.createElementNS(
//           "http://www.w3.org/2000/svg",
//           "circle"
//         )
//         circle.setAttribute("cx", pt.x.toString())
//         circle.setAttribute("cy", pt.y.toString())
//         circle.setAttribute("r", "4")
//         circle.setAttribute("fill", "#1B2B6B")
//         circle.setAttribute("opacity", "0.25")
//         svg.appendChild(circle)
//       })
//     }

//     const delays = [0, 0.3, 0.6, 0.9, 1.2, 1.5]
//     let i = 0

//     Object.values(cards).forEach((card) => {
//       if (card) {
//         const c = getCardCenter(card)
//         addLine(hubCX, hubCY, c.x, c.y, delays[i++])
//       }
//     })
//   }

//   useEffect(() => {
//     setTimeout(drawConnectors, 300)
//     window.addEventListener("resize", drawConnectors)
//     return () => window.removeEventListener("resize", drawConnectors)
//   }, [])

//   return (
//     <div className="relative min-h-screen overflow-x-hidden bg-[#e8edf7] font-sans">
//       {/* Background */}
//       <div className="bg-[radial-gradient(ellipse_60%_50%_at_15%_20%,rgba(27,43,107,0.07)_0%,transparent_60%),radial-gradient(ellipse_50%_40%_at_85%_80%,rgba(46,125,50,0.05)_0%,transparent_55%),radial-gradient(ellipse_40%_40%_at_50%_50%,rgba(255,255,255,0.4)_0%,transparent_70%),linear-gradient(160deg,#e0e6f5_0%,#e8edf7_50%,#dde8e4_100%) pointer-events-none fixed inset-0 z-0" />
//       <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle,rgba(27,43,107,0.18)_1px,transparent_1px)] bg-[length:28px_28px] opacity-40" />

//       <div className="page relative z-10 px-6 py-12 md:py-16">
//         {/* Header */}
//         {/* <div className="mb-12 text-center md:mb-14">
//           <div className="mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.28em] text-[#2E7D32] uppercase">
//             <div className="h-px w-7 bg-[#2E7D32]/60" />
//             OUR ECOSYSTEM
//             <div className="h-px w-7 bg-[#2E7D32]/60" />
//           </div>
//           <h1 className="text-4xl leading-tight font-bold text-[#1B2B6B] md:text-5xl lg:text-6xl">
//             Udayam <span className="text-[#2E7D32] italic">International</span>
//           </h1>
//           <p className="mx-auto mt-4 max-w-md text-[15px] text-[#6b7494]">
//             A global ecosystem connecting opportunities across travel,
//             education, healthcare, and commerce.
//           </p>
//         </div> */}

//         {/* Desktop Ecosystem Map */}
//         <div
//           className="relative mx-auto hidden max-w-[1100px] md:block"
//           ref={mapRef}
//         >
//           <div
//             className="grid grid-cols-1 items-center gap-0 md:grid-cols-3"
//             id="ecoMap"
//           >
//             {/* Top Row */}
//             <BrandCard
//               id="cardWings"
//               className="mr-10 mb-7 justify-self-end"
//               color="orange"
//               name="UV Wings"
//               tag="Fly Confidently"
//               desc="Air ticketing & travel bookings worldwide"
//             />
//             <BrandCard
//               id="cardHolidays"
//               className="mb-7 justify-self-center"
//               color="orange"
//               name="UV Holidays"
//               tag="Endless Memories"
//               desc="Curated holidays & leisure travel packages"
//             />
//             <BrandCard
//               id="cardPathways"
//               className="mb-7 ml-10 justify-self-start"
//               color="navy"
//               name="UV Pathways"
//               tag="Overseas Education"
//               desc="Overseas education & university counselling"
//             />

//             {/* Middle Row */}
//             <BrandCard
//               id="cardPlacements"
//               className="mr-10 justify-self-end"
//               color="green"
//               name="UV Placements"
//               tag="Placing Talent Worldwide"
//               desc="Global talent placement & recruitment"
//             />
//             <div id="hubCenter" className="z-20 justify-self-center">
//               <HubCenter />
//             </div>
//             <BrandCard
//               id="cardCommerce"
//               className="ml-10 justify-self-start"
//               color="green"
//               name="UV Commerce"
//               tag="Borderless Trade"
//               desc="International trade & borderless commerce"
//             />

//             {/* Bottom Row */}
//             <div className="col-start-2 mt-7">
//               <BrandCard
//                 id="cardTnc"
//                 color="green"
//                 name="UV Travel N Cure"
//                 tag="Healing Beyond Borders"
//                 desc="Medical tourism & global healthcare access"
//               />
//             </div>
//           </div>

//           {/* SVG Connectors */}
//           <svg
//             ref={connectorRef}
//             className="pointer-events-none absolute inset-0 z-10 h-full w-full"
//             aria-hidden="true"
//           />
//         </div>

//         {/* Mobile Ecosystem */}
//         <div className="space-y-8 md:hidden">
//           <MobileHub />
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <MobileBrandCard
//               name="UV Wings"
//               tag="Fly Confidently"
//               desc="Air ticketing & travel bookings worldwide"
//               color="orange"
//             />
//             <MobileBrandCard
//               name="UV Holidays"
//               tag="Endless Memories"
//               desc="Curated holidays & leisure travel packages"
//               color="orange"
//             />
//             <MobileBrandCard
//               name="UV Pathways"
//               tag="Overseas Education"
//               desc="Overseas education & university counselling"
//               color="navy"
//             />
//             <MobileBrandCard
//               name="UV Placements"
//               tag="Placing Talent Worldwide"
//               desc="Global talent placement & recruitment"
//               color="green"
//             />
//             <MobileBrandCard
//               name="UV Commerce"
//               tag="Borderless Trade"
//               desc="International trade & borderless commerce"
//               color="green"
//             />
//             <MobileBrandCard
//               name="UV Travel N Cure"
//               tag="Healing Beyond Borders"
//               desc="Medical tourism & global healthcare access"
//               color="green"
//               fullWidth
//             />
//           </div>
//         </div>

//         {/* Bottom Tagline */}
//         {/* <div className="mt-16 text-center">
//           <p className="font-serif text-lg text-[#6b7494] italic md:text-xl">
//             Connecting{" "}
//             <strong className="font-bold text-[#1B2B6B] not-italic">
//               People
//             </strong>{" "}
//             to Opportunities, the World, and Beyond.
//           </p>
//         </div> */}
//       </div>
//     </div>
//   )
// }

// export default UdayamEcosystem

// /* ====================== Reusable Components ====================== */

// const BrandCard = ({ id, className = "", color, name, tag, desc }: any) => {
//   const logoSrc =
//     {
//       wings: TourismLogo,
//       holidays: MedicalLogo,
//       pathways: EducationLogo,
//       placements: RecruitmentLogo,
//       commerce: TravelLogo,
//       tnc: TradeLogo,
//     }[id.replace("card", "").toLowerCase()] || "/logos/default.png"

//   return (
//     <div
//       id={id}
//       className={`brand-card group cursor-pointer rounded-3xl border border-white/80 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${className}`}
//     >
//       <div className="mb-4">
//         <img src={logoSrc} alt={name} className="h-12 w-auto object-contain" />
//         <div
//           className={`mt-1 text-sm font-medium tracking-widest ${color === "orange" ? "text-[#e07830]" : color === "green" ? "text-[#2E7D32]" : "text-[#243585]"}`}
//         >
//           {tag}
//         </div>
//       </div>

//       <div
//         className={`my-4 h-2 w-2 rounded-full ${color === "orange" ? "bg-[#e07830]" : color === "green" ? "bg-[#2E7D32]" : "bg-[#1B2B6B]"}`}
//       />

//       <p className="text-sm leading-relaxed text-[#6b7494]">{desc}</p>

//       <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#dde4f5] px-5 py-2.5 text-xs font-semibold text-[#1B2B6B] opacity-0 transition-all group-hover:opacity-100">
//         Explore
//         <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//           <path
//             d="M2.5 6h7M6.5 3l3 3-3 3"
//             stroke="#1B2B6B"
//             strokeWidth="1.3"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </div>
//     </div>
//   )
// }

// const HubCenter = () => (
//   <div className="relative h-[220px] w-[220px] md:h-[240px] md:w-[240px]">
//     <div
//       className="absolute inset-0 animate-spin rounded-full border border-dashed border-[#1B2B6B]/15"
//       style={{ animationDuration: "30s" }}
//     />
//     <div
//       className="absolute inset-[-28px] animate-spin rounded-full border border-dashed border-[#1B2B6B]/10"
//       style={{ animationDuration: "50s", animationDirection: "reverse" }}
//     />

//     <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full border-8 border-white bg-white shadow-2xl">
//       {/* Replace with your actual logo */}
//       <img
//         src={Homelogo}
//         alt="Udayam International"
//         className="h-32 w-32 object-contain drop-shadow-lg"
//       />
//     </div>

//     <div className="mt-4 text-center">
//       {/* <div className="font-serif text-xl leading-tight font-bold text-[#1B2B6B]">
//         Udayam
//         <br />
//         International
//       </div> */}
//       {/* <div className="text-[10px] font-medium tracking-widest text-[#6b7494] uppercase">
//         The Parent Brand
//       </div> */}
//     </div>
//   </div>
// )

// const MobileHub = () => (
//   <div className="mb-8 flex flex-col items-center">
//     <div className="relative h-36 w-36">
//       <div
//         className="absolute inset-0 animate-spin rounded-full border border-dashed border-[#1B2B6B]/20"
//         style={{ animationDuration: "25s" }}
//       />
//       <div className="flex h-full w-full items-center justify-center rounded-full border-4 border-white bg-white shadow-xl">
//         <img
//           src="/logos/udayam-international.png"
//           alt="Udayam"
//           className="h-16 w-16"
//         />
//       </div>
//     </div>
//     <div className="mt-4 text-center">
//       <div className="font-serif text-lg font-bold">Udayam International</div>
//       <div className="text-xs tracking-widest text-gray-500 uppercase">
//         The Parent Brand
//       </div>
//     </div>
//     <div className="my-4 h-8 w-1 bg-gradient-to-b from-[#1B2B6B]/30 to-transparent" />
//   </div>
// )

// const MobileBrandCard = ({
//   name,
//   tag,
//   desc,
//   color,
//   fullWidth = false,
// }: any) => (
//   <div
//     className={`rounded-3xl bg-white p-6 shadow ${fullWidth ? "col-span-1 sm:col-span-2" : ""}`}
//   >
//     <div className="flex items-center gap-3">
//       <div
//         className={`h-2.5 w-2.5 rounded-full ${color === "orange" ? "bg-[#e07830]" : "bg-[#2E7D32]"}`}
//       />
//       <div>
//         <div className="text-lg font-semibold">{name}</div>
//         <div
//           className={`text-xs font-medium ${color === "orange" ? "text-[#e07830]" : "text-[#2E7D32]"}`}
//         >
//           {tag}
//         </div>
//       </div>
//     </div>
//     <p className="mt-4 text-sm text-gray-600">{desc}</p>
//   </div>
// )
"use client"

import React, { useEffect, useRef } from "react"
import TourismLogo from "../../assets/TourismLogo.jpeg"
import Homelogo from "../../assets/home/HomeLogo.jpeg"
import MedicalLogo from "../../assets/MedicalLogo.jpeg"
import TradeLogo from "../../assets/TradeLogo.jpeg"
import RecruitmentLogo from "../../assets/RecruitmentLogo.jpeg"
import TravelLogo from "../../assets/TravelLogo.jpeg"
import EducationLogo from "../../assets/EducationLogo.jpeg"

const UdayamEcosystem: React.FC = () => {
  const connectorRef = useRef<SVGSVGElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const resizeTimeoutRef = useRef<NodeJS.Timeout>()

  const drawConnectors = () => {
    if (!connectorRef.current || window.innerWidth <= 768) return

    const svg = connectorRef.current
    const container = mapRef.current
    if (!container) return

    svg.innerHTML = ""

    const hub = document.getElementById("hubCenter") as HTMLDivElement
    const cards = {
      wings: document.getElementById("cardWings"),
      holidays: document.getElementById("cardHolidays"),
      pathways: document.getElementById("cardPathways"),
      placements: document.getElementById("cardPlacements"),
      commerce: document.getElementById("cardCommerce"),
      tnc: document.getElementById("cardTnc"),
    }

    const containerRect = container.getBoundingClientRect()
    const hubRect = hub.getBoundingClientRect()
    const hubCX = hubRect.left - containerRect.left + hubRect.width / 2
    const hubCY = hubRect.top - containerRect.top + hubRect.height / 2

    const getCardCenter = (el: HTMLElement) => {
      const r = el.getBoundingClientRect()
      return {
        x: r.left - containerRect.left + r.width / 2,
        y: r.top - containerRect.top + r.height / 2,
      }
    }

    const addLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      delay: number
    ) => {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      )
      line.setAttribute("x1", x1.toString())
      line.setAttribute("y1", y1.toString())
      line.setAttribute("x2", x2.toString())
      line.setAttribute("y2", y2.toString())
      line.setAttribute("stroke", "rgba(27,43,107,0.14)")
      line.setAttribute("stroke-width", "1.5")
      line.setAttribute("stroke-dasharray", "5 7")
      line.style.animation = `dashFlow 3s linear infinite`
      line.style.animationDelay = `${delay}s`
      svg.appendChild(line)
      ;[
        { x: x1, y: y1 },
        { x: x2, y: y2 },
      ].forEach((pt) => {
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle"
        )
        circle.setAttribute("cx", pt.x.toString())
        circle.setAttribute("cy", pt.y.toString())
        circle.setAttribute("r", "4")
        circle.setAttribute("fill", "#1B2B6B")
        circle.setAttribute("opacity", "0.25")
        svg.appendChild(circle)
      })
    }

    const delays = [0, 0.3, 0.6, 0.9, 1.2, 1.5]
    let i = 0

    Object.values(cards).forEach((card) => {
      if (card) {
        const c = getCardCenter(card)
        addLine(hubCX, hubCY, c.x, c.y, delays[i++])
      }
    })
  }

  useEffect(() => {
    // Add CSS keyframes to document
    const styleSheet = document.createElement("style")
    styleSheet.textContent = `
      @keyframes dashFlow {
        0% {
          stroke-dashoffset: 24;
        }
        100% {
          stroke-dashoffset: 0;
        }
      }
    `
    document.head.appendChild(styleSheet)

    // Initial draw with delay to ensure DOM is ready
    const initialTimeout = setTimeout(drawConnectors, 300)

    // Debounced resize handler
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      resizeTimeoutRef.current = setTimeout(drawConnectors, 150)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearTimeout(initialTimeout)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      window.removeEventListener("resize", handleResize)
      document.head.removeChild(styleSheet)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#e8edf7] font-sans">
      {/* Background */}
      <div className="bg-[radial-gradient(ellipse_60%_50%_at_15%_20%,rgba(27,43,107,0.07)_0%,transparent_60%),radial-gradient(ellipse_50%_40%_at_85%_80%,rgba(46,125,50,0.05)_0%,transparent_55%),radial-gradient(ellipse_40%_40%_at_50%_50%,rgba(255,255,255,0.4)_0%,transparent_70%),linear-gradient(160deg,#e0e6f5_0%,#e8edf7_50%,#dde8e4_100%) pointer-events-none fixed inset-0 z-0" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle,rgba(27,43,107,0.18)_1px,transparent_1px)] bg-[length:28px_28px] opacity-40" />

      <div className="page relative z-10 px-6 py-12 md:py-16">
        {/* Desktop Ecosystem Map */}
        <div
          className="relative mx-auto hidden max-w-[1100px] md:block"
          ref={mapRef}
        >
          <div
            className="grid grid-cols-1 items-center gap-0 md:grid-cols-3"
            id="ecoMap"
          >
            {/* Top Row */}
            <BrandCard
              id="cardWings"
              className="mr-10 mb-7 justify-self-end"
              color="orange"
              name="UV Wings"
              tag="Fly Confidently"
              desc="Air ticketing & travel bookings worldwide"
            />
            <BrandCard
              id="cardHolidays"
              className="mb-7 justify-self-center"
              color="orange"
              name="UV Holidays"
              tag="Endless Memories"
              desc="Curated holidays & leisure travel packages"
            />
            <BrandCard
              id="cardPathways"
              className="mb-7 ml-10 justify-self-start"
              color="navy"
              name="UV Pathways"
              tag="Overseas Education"
              desc="Overseas education & university counselling"
            />

            {/* Middle Row */}
            <BrandCard
              id="cardPlacements"
              className="mr-10 justify-self-end"
              color="green"
              name="UV Placements"
              tag="Placing Talent Worldwide"
              desc="Global talent placement & recruitment"
            />
            <div id="hubCenter" className="z-20 justify-self-center">
              <HubCenter />
            </div>
            <BrandCard
              id="cardCommerce"
              className="ml-10 justify-self-start"
              color="green"
              name="UV Commerce"
              tag="Borderless Trade"
              desc="International trade & borderless commerce"
            />

            {/* Bottom Row */}
            <div className="col-start-2 mt-7">
              <BrandCard
                id="cardTnc"
                color="green"
                name="UV Travel N Cure"
                tag="Healing Beyond Borders"
                desc="Medical tourism & global healthcare access"
              />
            </div>
          </div>

          {/* SVG Connectors */}
          <svg
            ref={connectorRef}
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            aria-hidden="true"
          />
        </div>

        {/* Mobile Ecosystem */}
        <div className="space-y-8 md:hidden">
          <MobileHub />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MobileBrandCard
              name="UV Wings"
              tag="Fly Confidently"
              desc="Air ticketing & travel bookings worldwide"
              color="orange"
            />
            <MobileBrandCard
              name="UV Holidays"
              tag="Endless Memories"
              desc="Curated holidays & leisure travel packages"
              color="orange"
            />
            <MobileBrandCard
              name="UV Pathways"
              tag="Overseas Education"
              desc="Overseas education & university counselling"
              color="navy"
            />
            <MobileBrandCard
              name="UV Placements"
              tag="Placing Talent Worldwide"
              desc="Global talent placement & recruitment"
              color="green"
            />
            <MobileBrandCard
              name="UV Commerce"
              tag="Borderless Trade"
              desc="International trade & borderless commerce"
              color="green"
            />
            <MobileBrandCard
              name="UV Travel N Cure"
              tag="Healing Beyond Borders"
              desc="Medical tourism & global healthcare access"
              color="green"
              fullWidth
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UdayamEcosystem

/* ====================== Reusable Components ====================== */

const BrandCard = ({ id, className = "", color, name, tag, desc }: any) => {
  const logoSrc =
    {
      wings: TourismLogo,
      holidays: MedicalLogo,
      pathways: EducationLogo,
      placements: RecruitmentLogo,
      commerce: TravelLogo,
      tnc: TradeLogo,
    }[id.replace("card", "").toLowerCase()] || TourismLogo

  return (
    <div
      id={id}
      className={`brand-card group cursor-pointer rounded-3xl border border-white/80 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${className}`}
    >
      <div className="mb-4">
        <img src={logoSrc} alt={name} className="h-12 w-auto object-contain" />
        <div
          className={`mt-1 text-sm font-medium tracking-widest ${
            color === "orange"
              ? "text-[#e07830]"
              : color === "green"
                ? "text-[#2E7D32]"
                : "text-[#243585]"
          }`}
        >
          {tag}
        </div>
      </div>

      <div
        className={`my-4 h-2 w-2 rounded-full ${
          color === "orange"
            ? "bg-[#e07830]"
            : color === "green"
              ? "bg-[#2E7D32]"
              : "bg-[#1B2B6B]"
        }`}
      />

      <p className="text-sm leading-relaxed text-[#6b7494]">{desc}</p>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#dde4f5] px-5 py-2.5 text-xs font-semibold text-[#1B2B6B] opacity-0 transition-all group-hover:opacity-100">
        Explore
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6h7M6.5 3l3 3-3 3"
            stroke="#1B2B6B"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

const HubCenter = () => (
  <div className="relative h-[220px] w-[220px] md:h-[240px] md:w-[240px]">
    <div
      className="absolute inset-0 animate-spin rounded-full border border-dashed border-[#1B2B6B]/15"
      style={{ animationDuration: "30s" }}
    />
    <div
      className="absolute inset-[-28px] animate-spin rounded-full border border-dashed border-[#1B2B6B]/10"
      style={{ animationDuration: "50s", animationDirection: "reverse" }}
    />

    <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full border-8 border-white bg-white shadow-2xl">
      <img
        src={Homelogo}
        alt="Udayam International"
        className="h-32 w-32 object-contain drop-shadow-lg"
      />
    </div>
  </div>
)

const MobileHub = () => (
  <div className="mb-8 flex flex-col items-center">
    <div className="relative h-36 w-36">
      <div
        className="absolute inset-0 animate-spin rounded-full border border-dashed border-[#1B2B6B]/20"
        style={{ animationDuration: "25s" }}
      />
      <div className="flex h-full w-full items-center justify-center rounded-full border-4 border-white bg-white shadow-xl">
        <img src={Homelogo} alt="Udayam" className="h-16 w-16 object-contain" />
      </div>
    </div>
    <div className="mt-4 text-center">
      <div className="font-serif text-lg font-bold text-[#1B2B6B]">
        Udayam International
      </div>
      <div className="text-xs tracking-widest text-gray-500 uppercase">
        The Parent Brand
      </div>
    </div>
    <div className="my-4 h-8 w-1 bg-gradient-to-b from-[#1B2B6B]/30 to-transparent" />
  </div>
)

const MobileBrandCard = ({
  name,
  tag,
  desc,
  color,
  fullWidth = false,
}: any) => (
  <div
    className={`rounded-3xl bg-white p-6 shadow ${
      fullWidth ? "col-span-1 sm:col-span-2" : ""
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`h-2.5 w-2.5 rounded-full ${
          color === "orange"
            ? "bg-[#e07830]"
            : color === "navy"
              ? "bg-[#1B2B6B]"
              : "bg-[#2E7D32]"
        }`}
      />
      <div>
        <div className="text-lg font-semibold text-[#1B2B6B]">{name}</div>
        <div
          className={`text-xs font-medium ${
            color === "orange"
              ? "text-[#e07830]"
              : color === "navy"
                ? "text-[#1B2B6B]"
                : "text-[#2E7D32]"
          }`}
        >
          {tag}
        </div>
      </div>
    </div>
    <p className="mt-4 text-sm text-gray-600">{desc}</p>
  </div>
)
