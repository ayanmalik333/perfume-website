import { Truck, RotateCcw, ShieldCheck, Crown } from "lucide-react";

export default function ServiceFeatures() {
  const features = [
    {
      icon: <Truck className="w-5 h-5 text-[#C5A880] stroke-[1.5]" />,
      title: "COMPLIMENTARY SHIPPING",
      description: "On all orders worldwide"
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-[#C5A880] stroke-[1.5]" />,
      title: "BESPOKE EXCHANGES",
      description: "30-day elegant sample swap"
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#C5A880] stroke-[1.5]" />,
      title: "SECURE ENCRYPTION",
      description: "Fully certified private payments"
    },
    {
      icon: <Crown className="w-5 h-5 text-[#C5A880] stroke-[1.5]" />,
      title: "THE FRAGRANCE SALON",
      description: "Access rare private reserves"
    }
  ];

  return (
    <section className="bg-[#FAF9F6] border-y border-[#E5D9D3]/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 items-center">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-2.5 sm:space-y-0 sm:space-x-3.5 px-2 justify-center"
            >
              {/* Icon Container */}
              <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-xs flex-shrink-0 border border-[#E5D9D3]/30">
                {item.icon}
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col">
                <h4 className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.15em] text-[#121212] uppercase">
                  {item.title}
                </h4>
                <p className="text-[9px] sm:text-[10px] font-sans text-[#7C7167] tracking-normal mt-0.5 leading-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
