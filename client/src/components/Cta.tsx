"use client"

import React, { useRef, useEffect } from "react"

interface CTASectionProps {
  backgroundImage?: string
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
}

const CTASection: React.FC<CTASectionProps> = ({
  backgroundImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&auto=format&fit=crop&q=80",
  title = "Ready to Begin Your Journey?",
  subtitle = "Let us craft the trip of a lifetime for you.",
  buttonText = "Explore Our Tours",
  buttonLink = "#tours",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  // Parallax Effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return

      const scrollY = window.scrollY
      const sectionTop = sectionRef.current.offsetTop
      const sectionHeight = sectionRef.current.offsetHeight

      // Only apply parallax when section is in view
      if (
        scrollY + window.innerHeight > sectionTop &&
        scrollY < sectionTop + sectionHeight
      ) {
        const offset = (scrollY - sectionTop) * 0.4 // Adjust speed (0.3 - 0.6 is good)
        bgRef.current.style.transform = `translateY(${offset}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[80vh] items-center justify-center overflow-hidden py-32 md:py-40"
    >
      {/* Background Image with Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-[#1B2B6B]/70 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="reveal relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
        <h2 className="mb-6 font-heading text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
          {title}
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-xl font-light text-white/90 md:text-2xl">
          {subtitle}
        </p>

        <a
          href={buttonLink}
          className="font-ui inline-block rounded-full bg-[#2E7D32] px-10 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#256427] hover:shadow-2xl active:scale-95"
        >
          {buttonText}
        </a>
      </div>

      {/* Optional subtle bottom fade */}
      <div className="absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

export default CTASection
