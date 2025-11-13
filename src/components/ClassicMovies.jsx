import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ClassicMovies = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  const movies = [
    {
      id: 1,
      title: "Casablanca",
      year: "1942",
      director: "Michael Curtiz",
      description: "Um clássico romântico ambientado durante a Segunda Guerra Mundial.",
      color: "from-stone-900/40 to-neutral-900/20",
    },
    {
      id: 2,
      title: "O Padrinho",
      year: "1972",
      director: "Francis Ford Coppola",
      description: "A saga épica da família Corleone no mundo do crime.",
      color: "from-stone-900/40 to-neutral-900/20",
    },
    {
      id: 3,
      title: "Pulp Fiction",
      year: "1994",
      director: "Quentin Tarantino",
      description: "Histórias entrelaçadas do submundo criminal de Los Angeles.",
      color: "from-stone-900/40 to-neutral-900/20",
    },
    {
      id: 4,
      title: "2001: Odisseia no Espaço",
      year: "1968",
      director: "Stanley Kubrick",
      description: "Uma jornada épica através do espaço e da evolução humana.",
      color: "from-stone-900/40 to-neutral-900/20",
    },
  ];

  useGSAP(() => {
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 40%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 100, duration: 0.8,
      ease: "power3.out",
    });

    cardsRef.current.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          end: "top 40%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 100,
        rotation: i % 2 === 0 ? -5 : 5,
        duration: 0.5,
        ease: "power3.out",
        delay: i * 0.15,
      });

      card.addEventListener("mouseenter", () =>
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          duration: 0.3,
          ease: "power2.out",
        })
      );

      card.addEventListener("mouseleave", () =>
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      );
    });
  }, []);

  return (
    <section id="classic-movies" className="noisy">
      <div className="absolute inset-0 opacity-50"></div>

      <div className="container mx-auto relative z-10">
        <h2 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-modern-negra text-center text-yellow mb-20">
          Clássicos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {movies.map((movie, i) => (
            <div
              key={movie.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`card bg-gradient-to-br ${movie.color}`}
            >
              <div className="flex justify-between items-start mb-6">
                <span>{movie.year}</span>
                <span className="text-yellow text-2xl font-modern-negra">
                  {String(movie.id).padStart(2, "0")}
                </span>
              </div>

              <h3>{movie.title}</h3>

              <p>{movie.description}</p>

              <div className="pt-4 border-t border-white/10 mt-auto">
                <p className="text-yellow/80 text-xs md:text-sm">Dirigido por</p>
                <p className="text-white font-medium mt-1">{movie.director}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClassicMovies;
