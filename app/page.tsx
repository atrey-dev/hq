import Image from "next/image";
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/marquee";
import Lottie from "@/components/Lottie";
import TextType from "@/components/TextType";

const logos = [
  { src: "/logos/webflow.svg", alt: "Webflow" },
  { src: "/logos/shopify.svg", alt: "Shopify" },
  { src: "/logos/figma.svg", alt: "Figma" },
  { src: "/logos/nextjs.svg", alt: "Next JS" },
  { src: "/logos/unity.svg", alt: "Unity" },
  { src: "/logos/mongodb.svg", alt: "MongoDB" },
  { src: "/logos/reactjs.svg", alt: "ReactJS" },
  { src: "/logos/firebase.svg", alt: "Firebase" },
  { src: "/logos/nodejs.svg", alt: "NodeJS" },
  { src: "/logos/nestjs.svg", alt: "NestJS" },
  { src: "/logos/androidstudio.svg", alt: "Android Studio" },
  { src: "/logos/flutter.svg", alt: "Flutter" },
  { src: "/logos/aws.svg", alt: "AWS" },
  { src: "/logos/arduino.svg", alt: "Arduino" },
  { src: "/logos/solidity.svg", alt: "Solidity" },
  { src: "/logos/solana.svg", alt: "Solana" },
  { src: "/logos/ethereum.svg", alt: "Ethereum" },
  { src: "/logos/wordpress.svg", alt: "WordPress" },
  { src: "/logos/n8n.svg", alt: "n8n" },
  { src: "/logos/c++.svg", alt: "C++" },
];

export default function Home() {
  return (
    <div className="min-h-svh w-full bg-background text-foreground flex flex-col">
      {/* Header removed as requested */}

      <main id="home" className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <Lottie src="/champagne-flutes-hover-pinch.json" width={35} height={35} playOnHover autoplay={false} />
        <h1 className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight">
          Builders ready to bring crazy ideas to life.
        </h1>
        <p className="text-sm sm:text-base text-[#B6B6B6]">
          We have expertise in{' '}
          <TextType
            className="text-sm sm:text-base text-[#B6B6B6]"
            text={["Game Dev", "Web Apps", "App Dev", "Designing", "Bots", "AI Apps", "Landing Pages", "Automation", "UI/UX"]}
            typingSpeed={50}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
          />
        </p>

        <section className="w-full max-w-3xl mt-2">
          <Marquee className="py-1">
            <MarqueeFade side="left" />
            <MarqueeContent speed={40} pauseOnHover autoFill ariaLabel="Technologies we use">
              {logos.map((logo, idx) => (
                <MarqueeItem key={idx} className="flex flex-col items-center gap-2">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
                    <Image src={logo.src} alt={logo.alt} width={25} height={25} className="block object-contain" />
                  </div>
                  <span className="text-xs opacity-75">{logo.alt}</span>
                </MarqueeItem>
              ))}
            </MarqueeContent>
            <MarqueeFade side="right" />
          </Marquee>
        </section>

        <div className="mt-6 flex items-center gap-6">
          <a
            href="mailto:build@atrey.dev"
            className="text-sm sm:text-base px-1 py-0.5 text-stone-400 link-underline"
          >
            build@atrey.dev
          </a>
          <a
            href="https://wa.me/918115605720"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base px-1 py-0.5 text-stone-400 link-underline"
          >
            wa.me/8115605720
          </a>
        </div>
      </main>
    </div>
  );
}
