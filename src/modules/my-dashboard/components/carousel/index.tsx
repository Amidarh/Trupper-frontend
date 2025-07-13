import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { latestNews } from "@/constants/data";
import { NewsCard } from "../cards/newsCard";

export const NewsCarousel = () => (
  <Carousel
    plugins={[
      Autoplay({
        delay: 10000,
      }),
    ]}
  >
    <CarouselContent>
      {latestNews.map((news) => (
        <CarouselItem key={news.id}>
          <NewsCard news={news} />
        </CarouselItem>
      ))}
    </CarouselContent>
      <CarouselPrevious />
    <CarouselNext />
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);
