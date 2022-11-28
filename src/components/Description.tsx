export default function Description({ html }: { html: string }) {
  return (
    <div
      className="h-full w-full focus:outline-none p-6 prose max-w-none bg-white"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
