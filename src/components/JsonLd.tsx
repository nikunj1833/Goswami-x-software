export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "#organization",
        "name": "RN Developer",
        "legalName": "RN SOFTWARE DEVELOPER",
        "description":
          "A sole proprietorship software development business focused on mobile applications, games, and web-based software.",
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
        "name": "RN Developer",
        "description": "Official website of RN Developer, a software development business.",
        "publisher": {
          "@id": "#organization",
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
