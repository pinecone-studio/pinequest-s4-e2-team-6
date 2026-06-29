import { ServiceWorker } from "@/components/ServiceWorker";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceWorker />
      {children}
    </>
  );
}
