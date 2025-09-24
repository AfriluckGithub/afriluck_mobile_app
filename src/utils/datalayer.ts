declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const trackPurchase = (order: {
  transaction_id: string;
  value: number;
  tax?: number;
  shipping?: number;
  currency: string;
  items: any[];
}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null }); // clear previous
  window.dataLayer.push({
    event: "purchase",
    ecommerce: order,
  });
};