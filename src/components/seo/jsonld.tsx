export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is generated from typed objects in this codebase.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
