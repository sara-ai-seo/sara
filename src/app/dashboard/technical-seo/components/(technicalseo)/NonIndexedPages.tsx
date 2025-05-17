import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


interface UrlItem {
  url: string;
  reason: string;
}

interface Props {
  data: UrlItem[];
}

export function NonIndexedPages({ data }: Props) {
  // Group the data by reason
  const groupedData = data.reduce((acc, { url, reason }) => {
    if (!acc[reason]) {
      acc[reason] = [];
    }
    acc[reason].push(url);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <Accordion type="single" collapsible className="w-full">
      {Object.entries(groupedData).map(([reason, urls], index) => (
        <AccordionItem key={reason} value={`item-${index}`}>
          <AccordionTrigger>
            {reason} ({urls.length} URLs)
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {urls.map(url => (
                <li key={url}>
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
