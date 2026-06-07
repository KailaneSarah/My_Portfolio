import ParticlesBg from "@/components/ui/animated/ParticlesBg";

export function ContactBackground() {
  return (
    <div className="contact__bg">
      <ParticlesBg
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleColors={["#ff0090", "#9000ff"]}
        particleBaseSize={200}
        sizeRandomness={1}
        cameraDistance={10}
      />
    </div>
  );
}