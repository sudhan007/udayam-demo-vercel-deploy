import { useState } from "react"

const destinationsData = [
  {
    id: 1,
    country: "Asia",
    city: "Maldives",
    price: "Packages from ₹45,000 / person",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80",
    featured: true,
    badge: " Featured",
  },
  {
    id: 2,
    country: "Middle East",
    city: "Dubai",
    price: "From ₹30,000",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80",
    featured: false,
  },
  {
    id: 3,
    country: "Europe",
    city: "Paris",
    price: "From ₹85,000",
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
    featured: false,
  },
  {
    id: 4,
    country: "Asia",
    city: "Singapore",
    price: "From ₹38,000",
    image:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
    featured: false,
  },
  {
    id: 5,
    country: "Asia",
    city: "Thailand",
    price: "From ₹22,000",
    image:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
    featured: false,
  },
  // Add more destinations as needed
]

const tabs = ["All", "Asia", "Europe", "Middle East", "Americas"]

const DestinationsSection = () => {
  const [activeTab, setActiveTab] = useState("All")

  const filteredDestinations =
    activeTab === "All"
      ? destinationsData
      : destinationsData.filter((dest) => dest.country === activeTab)

  return (
    <section id="destinations" className="bg-white px-5 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#0D1B4B] md:text-5xl">
            Popular Destinations
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Handpicked destinations for memorable journeys — from serene beaches
            to vibrant cities and healing retreats.
          </p>
        </div>

        {/* Tabs */}
        {/* <div className="mb-12 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border-2 px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "border-[#0D1B4B] bg-[#0D1B4B] text-white"
                  : "border-gray-200 text-gray-600 hover:border-[#0D1B4B] hover:text-[#0D1B4B]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div> */}

        {/* Destinations Grid */}
        <div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredDestinations.map((dest, index) => (
            <div
              key={dest.id}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-2 ${dest.featured ? "lg:col-span-2 lg:row-span-2" : ""}`}
            >
              <img
                src={dest.image}
                alt={dest.city}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B4B]/90 via-[#0D1B4B]/40 to-transparent transition-all duration-300 group-hover:from-[#0D1B4B]/95" />

              {/* Badge */}
              {dest.badge && (
                <div className="absolute top-6 right-6 rounded-full bg-orange-500 px-4 py-2 text-xs font-bold text-white hover:bg-orange-600">
                  {dest.badge}
                </div>
              )}

              {/* Content */}
              <div className="absolute right-0 bottom-0 left-0 p-8 text-white">
                <div className="mb-1 text-xs font-semibold tracking-widest text-[#E8B93A] uppercase">
                  {dest.country}
                </div>
                <h3
                  className={`mb-2 font-bold text-white transition-all ${dest.featured ? "text-4xl" : "text-2xl"}`}
                >
                  {dest.city}
                </h3>
                <p className="font-inter text-sm opacity-90">{dest.price}</p>
              </div>

              {/* Hover Effect Layer */}
              <div className="group-hover:border-bg-orange-500 absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DestinationsSection
