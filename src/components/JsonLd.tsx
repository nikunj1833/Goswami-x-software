export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.rndeveloper.in/#organization",
        "name": "RN Developer",
        "legalName": "RN SOFTWARE DEVELOPER",
        "url": "https://www.rndeveloper.in",
        "description":
          "A sole proprietorship software development business focused on mobile applications, games, and web-based software.",
        "knowsAbout": [
          "Android App Development",
          "Mobile App Development",
          "Android Game Development",
          "Google Play Store Publishing Support",
          "Google Play Console Setup & Guidance",
          "Website Design & Development",
          "Custom Software Development",
          "Business Applications Development",
          "App Maintenance & Updates",
          "Kotlin",
          "React Native",
          "React.js",
          "Next.js",
          "TypeScript",
          "Firebase",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.rndeveloper.in/#website",
        "name": "RN Developer",
        "url": "https://www.rndeveloper.in",
        "description": "Official website of RN Developer, a software development business.",
        "publisher": {
          "@id": "https://www.rndeveloper.in/#organization",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.rndeveloper.in/#service",
        "name": "RN Developer",
        "url": "https://www.rndeveloper.in",
        "description":
          "Professional software development services specializing in Android mobile applications, casual games, Play Store publishing guidance, and custom web software.",
        "parentOrganization": {
          "@id": "https://www.rndeveloper.in/#organization",
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
