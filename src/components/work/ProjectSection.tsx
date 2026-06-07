import Image from "next/image";

interface ProjectImage {
  src: string;
  alt: string;
}

interface Props {
  title: string;
  images: ProjectImage[];
}

export default function ProjectSection({ title, images }: Props) {
  return (
    <div className="project-section">
      <h6 className="project-section__title">{title}</h6>

      {images.length > 0 && (
        <div className="project-section__grid">
          {images.map((img, i) => (
            <div key={i} className="project-section__img-wrap">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="project-section__img"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}