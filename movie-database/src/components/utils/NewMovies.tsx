import * as React from "react";
import { fetchNewApi } from "@/api/api";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import Image from "next/image";

interface NewDataProps {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  title: string;
  video: boolean;
  vote_average: number;
  release_date: string;
}

interface definitionProps {
  divImage: string;
  image: string;
}

const NewMovies = (props: definitionProps) => {
  const [movies, setMovies] = useState<NewDataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNewApi();
        const data = response.results; 
        setMovies(data);
      } catch (error) {
        console.log("Ouve um erro ao achar seu filme", error);
      }
    };
    fetchData();
  }, []);

  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="max-w-fit md:w-10/12"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {movies.map((movie, index) => (
          <CarouselItem key={index}>
            <div className={props.divImage}>
              <Image
                alt={movie.title}
                priority
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                width={1000}
                height={562} // Ajuste a altura proporcionalmente
                className={props.image}
              /> 
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default NewMovies;
