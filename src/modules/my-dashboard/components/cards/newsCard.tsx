import Image, { StaticImageData } from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDynamicTextColor } from "@/utils/color"; // adjust path

type NewsCardProps = {
  news: {
    id: string;
    title: string;
    description: string;
    image: string | StaticImageData;
  };
};

export const NewsCard = ({ news }: NewsCardProps) => {
  const imageSrc = typeof news.image === "string" ? news.image : news.image.src;
  const textColor = useDynamicTextColor(imageSrc);

  return (
    <Card className="relative h-72 overflow-hidden rounded-xl border-0">
      <Image
        src={news.image}
        alt={news.title}
        fill
        className="object-cover object-right"
        quality={100}
        priority
      />

      <CardContent
        className={`absolute top-1/2 min-md:left-10 -translate-y-1/2 max-w-lg backdrop-blur-md bg-white/30 dark:bg-white/10 p-6 rounded-2xl shadow-xl ${textColor}`}
      >
        <h1 className="text-2xl font-semibold mb-3">{news.title}</h1>
        <p className="leading-relaxed text-sm line-clamp-3">
          {news.description}
        </p>
        <div className="mt-4">
          <Button size="sm">View</Button>
        </div>
      </CardContent>
    </Card>
  );
};
