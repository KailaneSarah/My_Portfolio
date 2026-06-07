export function AboutResume() {
  return (
    <a
      href="/resume.pdf"
      download
      className="about__resume"
    >
      Baixar currículo
      <span className="about__resume-icon">↓</span>
    </a>
  );
}