export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "#person",
        "name": "Nikunj Giri",
        "jobTitle": "Full-Stack Developer",
        "description":
          "Self-taught full-stack developer building real projects across web and mobile — Goswami X Software.",
        "knowsAbout": [
          "React.js",
          "React Native",
          "Android Development",
          "Kotlin",
          "Firebase",
          "TypeScript",
          "JavaScript",
          "HTML5",
          "CSS3",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "#website",
        "name": "Goswami X Software",
        "description": "Portfolio of Nikunj Giri, Full-Stack Developer.",
        "publisher": {
          "@id": "#person",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
