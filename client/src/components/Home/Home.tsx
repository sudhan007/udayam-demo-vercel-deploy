import React, { useState, useEffect, useRef, useCallback } from "react"
import DestinationsSection from "../Destinationscarousel"
import TravelCards from "./TravelCards"
import { useNavigate } from "react-router-dom"
import {
  heroSlides,
  catPills,
  stats,
  testimonials,
  whyUs,
} from "@/lib/homeData"
import Services from "./Services"

export const SectionTitle: React.FC<{
  children: React.ReactNode
  hl?: string
  center?: boolean
}> = ({ children, hl, center }) => (
  <h2
    className="leading-[1.15] font-extrabold tracking-[-0.5px]"
    style={{
      fontSize: "clamp(26px, 3vw, 42px)",
      color: "#0D1B3E",
      textAlign: center ? "center" : "left",
    }}
  >
    {children}
    {hl && <span style={{ color: "#1B2B6B" }}> {hl}</span>}
  </h2>
)

const Home = () => {
  const [slide, setSlide] = useState(0)
  const [activeCat, setActiveCat] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const navigate = useNavigate()

  const gSlide = useCallback((n: number) => {
    setSlide((n + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(() => gSlide(slide + 1), 5000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [slide, gSlide])

  return (
    <div>
      {/* ══ HERO CAROUSEL ══ */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "calc(100vh - 108px)",
          minHeight: 580,
          maxHeight: 820,
        }}
      >
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-all duration-[900ms] ease-in-out"
            style={{
              opacity: i === slide ? 1 : 0,
              transform: i === slide ? "scale(1)" : "scale(1.05)",
              pointerEvents: i === slide ? "auto" : "none",
            }}
          >
            <img src={s.img} alt="" className="h-full w-full object-cover" />
            {/* overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, rgba(11,20,60,.82) 0%, rgba(11,20,60,.5) 55%, rgba(11,20,60,.15) 100%)",
              }}
            />
            {/* content */}
            <div className="absolute top-1/2 left-[9%] z-[3] max-w-[600px] -translate-y-1/2">
              <div
                className="mb-[18px] inline-flex items-center gap-2 text-[12px] font-bold tracking-[2px] uppercase"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                <span
                  className="h-[2px] w-7 rounded-sm"
                  style={{ background: "#43A047" }}
                />
                {s.eyebrow}
              </div>
              <h1
                className="mb-4 leading-[1.08] font-extrabold tracking-[-0.8px] text-white"
                style={{
                  fontSize: "clamp(40px, 5.5vw, 74px)",
                }}
              >
                {s.h1Parts.map((part, pi) => (
                  <React.Fragment key={pi}>
                    {part === s.emWord ? (
                      <em
                        key={pi}
                        style={{ fontStyle: "italic", color: "#7EC8E3" }}
                      >
                        {part}
                      </em>
                    ) : (
                      part
                    )}
                    {pi < s.h1Parts.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>
              <p
                className="mb-[34px] max-w-[460px] text-[16.5px] leading-[1.75]"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(s.btn1.page)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border-none px-[30px] py-[13px] font-inter text-[14.5px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #388E3C, #43A047)",
                    boxShadow: "0 6px 24px rgba(46,125,50,0.45)",
                  }}
                >
                  {s.btn1.label}
                </button>
                <button
                  onClick={() => navigate(s.btn2.page)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full px-[26px] py-[13px] font-inter text-[14.5px] font-semibold text-white transition-all duration-200"
                  style={{
                    border: "2px solid rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {s.btn2.label}
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Prev / Next */}
        {/* {[
          { dir: "prev", ch: "←" },
          { dir: "next", ch: "→" },
        ].map(({ dir, ch }) => (
          <button
            key={dir}
            onClick={() => gSlide(dir === "prev" ? slide - 1 : slide + 1)}
            className="absolute top-1/2 z-10 flex h-[50px] w-[50px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-[22px] text-white transition-all duration-200"
            style={{
              [dir === "prev" ? "left" : "right"]: 24,
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              border: "1.5px solid rgba(255,255,255,0.3)",
            }}
          >
            {ch}
          </button>
        ))} */}

        {/* Dots */}
        <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => gSlide(i)}
              className="cursor-pointer rounded-full border-none transition-all duration-300"
              style={{
                width: i === slide ? 28 : 8,
                height: 8,
                background: i === slide ? "#fff" : "rgba(255,255,255,0.38)",
              }}
            />
          ))}
        </div>

        {/* Slide number */}
        <div
          className="absolute right-10 bottom-7 z-10 text-[13px] font-semibold"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <span className="text-[18px] font-bold text-white">{slide + 1}</span>/
          {heroSlides.length}
        </div>

        {/* Thumbnail sidebar */}
        <div className="absolute top-1/2 right-7 z-10 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex">
          {heroSlides.map((s, i) => (
            <button
              key={i}
              onClick={() => gSlide(i)}
              className="h-14 w-14 cursor-pointer overflow-hidden rounded-[10px] border-none p-0 transition-all duration-300"
              style={{
                opacity: i === slide ? 1 : 0.4,
                border:
                  i === slide ? "2px solid #fff" : "2px solid transparent",
                boxShadow: i === slide ? "0 4px 16px rgba(0,0,0,0.4)" : "none",
              }}
            >
              <img
                src={s.thumb}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ══ DESTINATIONS CAROUSEL ══ */}
      <DestinationsSection />

      {/* ══ SERVICES ══ */}

      <Services />

      {/* ══ TOUR CARDS ══ */}

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
          {/* Header */}
          <div className="mb-10 flex flex-wrap items-end justify-center gap-4">
            <div>
              <h2 className="text-4xl font-bold text-[#0D1B3E] md:text-5xl">
                Top Tour <span className="text-[#1B2B6B]">Packages</span>
              </h2>
            </div>

            {/* <button
              onClick={() => onNavigate("tourism")}
              className="inline-flex items-center gap-2 rounded-full border border-[#E8ECFA] bg-[#E8ECFA] px-6 py-2.5 font-inter text-sm font-semibold text-[#1B2B6B] transition-all hover:border-[#1B2B6B] hover:bg-[#1B2B6B] hover:text-white"
            >
              All Packages →
            </button> */}
          </div>

          {/* Category Pills */}
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {catPills.map((pill, i) => (
              <button
                key={i}
                onClick={() => setActiveCat(i)}
                className={`rounded-full px-4 py-2.5 font-inter text-sm font-medium transition-all duration-200 ${
                  activeCat === i
                    ? "bg-[#1B2B6B] text-white shadow-lg shadow-[#1B2B6B]/30"
                    : "border border-[#DDE3F0] bg-white text-[#2D3A5A] hover:border-[#1B2B6B]"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Packages Grid */}
          <TravelCards />
        </div>
      </section>

      {/* ══ STATS ══ */}

      <div className="grid grid-cols-2 bg-[#0F1B47] md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`border-r border-white/10 px-6 py-8 text-center last:border-r-0 md:border-r md:px-7 md:py-[38px] md:last:border-r-0`}
          >
            <div
              className="flex items-center justify-center font-inter leading-none font-extrabold text-white"
              style={{ fontSize: "42px" }}
            >
              <div> {s.num}</div>
              <div className="ml-1 text-3xl" style={{ color: "#43A047" }}>
                {s.sup}
              </div>
            </div>

            <div
              className="mt-1.5 text-xs font-medium tracking-[0.5px] uppercase"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ══ WHY US ══ */}

      <section className="py-14">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
          <div className="mb-10 md:mb-12">
            <SectionTitle hl="Confidence">Travel with</SectionTitle>
            <p
              className="mx-auto mt-3 font-inter text-[15px] leading-relaxed md:leading-[1.7]"
              style={{ color: "#5A6880" }}
            >
              15+ years of crafting unforgettable journeys — we're with you
              every step of the way.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-[22px] lg:grid-cols-3 xl:grid-cols-4">
            {whyUs.map((w, i) => (
              <div
                key={i}
                className="group cursor-default rounded-[18px] px-6 py-8 text-center transition-all duration-300 md:px-[26px] md:py-[30px]"
                style={{
                  background: "#fff",
                  border: "1px solid #DDE3F0",
                  boxShadow: "0 1px 3px rgba(27,43,107,0.07)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "#1B2B6B"
                  el.style.boxShadow = "0 8px 32px rgba(27,43,107,0.12)"
                  el.style.transform = "translateY(-5px)"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "#DDE3F0"
                  el.style.boxShadow = "0 1px 3px rgba(27,43,107,0.07)"
                  el.style.transform = "none"
                }}
              >
                {/* Icon */}
                <div
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl text-3xl md:h-[62px] md:w-[62px] md:text-[26px]"
                  style={{ background: "#E8ECFA" }}
                >
                  {w.icon}
                </div>

                {/* Title */}
                <div
                  className="mb-3 font-inter text-lg font-bold md:text-[15.5px]"
                  style={{ color: "#0D1B3E" }}
                >
                  {w.title}
                </div>

                {/* Description */}
                <div
                  className="text-sm leading-relaxed md:text-[13px] md:leading-[1.65]"
                  style={{ color: "#5A6880" }}
                >
                  {w.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}

      <section className="py-14" style={{ background: "#EFF3FB" }}>
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-10">
          {/* Header */}
          <div className="mx-auto mb-10 max-w-[580px] text-center md:mb-11">
            <SectionTitle center hl="Clients Say">
              What Our
            </SectionTitle>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-[22px] lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="relative cursor-default overflow-hidden rounded-[18px] px-6 py-8 transition-all duration-300 md:px-7 md:py-[28px]"
                style={{
                  background: "#fff",
                  border: "1px solid #DDE3F0",
                  boxShadow: "0 1px 3px rgba(27,43,107,0.07)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "#1B2B6B"
                  el.style.boxShadow = "0 6px 24px rgba(27,43,107,0.11)"
                  el.style.transform = "translateY(-4px)"
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = "#DDE3F0"
                  el.style.boxShadow = "0 1px 3px rgba(27,43,107,0.07)"
                  el.style.transform = "none"
                }}
              >
                {/* Big Quote Mark */}
                {/* <div
                  className="pointer-events-none absolute top-[-12px] right-4 text-[90px] leading-none font-extrabold select-none md:right-[18px] md:text-[110px]"
                  style={{ color: "#E8ECFA" }}
                >
                  "
                </div> */}

                {/* Stars */}
                <div
                  className="mb-4 text-[13px] tracking-[2px]"
                  style={{ color: "#F59E0B" }}
                >
                  ★★★★★
                </div>

                {/* Testimonial Text */}
                <p
                  className="relative z-[1] mb-6 text-[14.5px] leading-relaxed md:text-[14px] md:leading-[1.78]"
                  style={{ color: "#2D3A5A" }}
                >
                  {t.text}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-[17px] font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #1B2B6B, #1565C0)",
                    }}
                  >
                    {t.av}
                  </div>
                  <div>
                    <div
                      className="text-[14.5px] font-bold md:text-[14px]"
                      style={{ color: "#0D1B3E" }}
                    >
                      {t.name}
                    </div>
                    <div
                      className="mt-0.5 text-[12.5px] md:text-[12px]"
                      style={{ color: "#5A6880" }}
                    >
                      {t.trip}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHATSAPP ══ */}
      <a
        href="https://wa.me/91xxxxxxx"
        target="_blank"
        rel="noreferrer"
        className="group fixed right-[26px] bottom-[26px] z-[998] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full transition-transform duration-200 hover:scale-110"
        style={{
          background: "#25D366",
          boxShadow: "0 4px 20px rgba(37,211,102,0.38)",
          animation: "waPulse 2.5s infinite",
        }}
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span
          className="pointer-events-none absolute right-16 bottom-1/2 translate-y-1/2 rounded-lg px-3.5 py-1.5 text-[12px] whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ background: "#0D1B3E" }}
        >
          Chat on WhatsApp
        </span>
      </a>

      <style>{`
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.38); }
          50% { box-shadow: 0 4px 28px rgba(37,211,102,0.58); }
        }
        /* Responsive overrides */
        @media (max-width: 1100px) {
          .dest-grid-r { grid-template-columns: repeat(3, 1fr) !important; }
          .tour-grid-r { grid-template-columns: repeat(2, 1fr) !important; }
          .why-grid-r  { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .dest-grid-r  { grid-template-columns: repeat(2, 1fr) !important; }
          .tour-grid-r  { grid-template-columns: 1fr !important; }
          .svc-grid-r   { grid-template-columns: 1fr !important; }
          .deal-grid-r  { grid-template-columns: 1fr !important; }
          .testi-grid-r { grid-template-columns: 1fr !important; }
          .ft-grid-r    { grid-template-columns: 1fr 1fr !important; }
          .stats-grid-r { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}

export default Home
