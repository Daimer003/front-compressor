import { useState, useEffect } from "react";

const PayPalButton = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Evita cargar el script más de una vez
    if (document.getElementById("paypal-sdk")) return;

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.PUBLIC_CLIENT_ID}&disable-funding=credit,card`;
    script.id = "paypal-sdk";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setLoaded(true);
    };
  }, []);

  useEffect(() => {
    if (loaded && window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: "10.00" } }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Pago completado por ${details.payer.name.given_name}`);
          });
        },
      }).render("#paypal-button-container");
    }
  }, [loaded]);

  return <div className='flex'id="paypal-button-container"></div>;
};

export default PayPalButton;