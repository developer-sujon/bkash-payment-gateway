import { useRef, useState } from "react";
import { useBkash } from "react-bkash";

const App = () => {
  const [price, setPirce] = useState(1);
  const [invoice, setInvoice] = useState("3sdf2");

  const { error, loading, triggerBkash } = useBkash({
    onSuccess: (data) => {
      console.log(data);
    },
    onClose: () => {
      console.log("Bkash iFrame closed");
    },
    bkashScriptURL:
      "https://scripts.pay.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout.js",
    amount: price,
    onCreatePayment: async (paymentRequest) => {
      return await fetch("http://localhost:8080/api/v1/bkash/createPayment", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          ...paymentRequest,
          merchantInvoiceNumber: invoice,
        }),
      }).then((res) => res.json());
    },
    onExecutePayment: async (paymentID) => {
      console.log(paymentID);
      return await fetch(
        `http://localhost:8080/api/v1/bkash/executePayment/${paymentID}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      )
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col">
          <label>Product invoice ID?</label>
          <input
            type="text"
            placeholder="Order ID"
            className="form-control"
            defaultValue={invoice}
            disabled
          />
          <input
            type="number"
            placeholder="Product Price"
            className="form-control my-3"
            defaultValue={price}
            disabled
          />
          <button className="btn btn-primary" onClick={triggerBkash}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
