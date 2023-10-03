import React, { useRef, useState } from "react";
import { Button, Typography } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";

const Signature = ({ setsignatureData }) => {
  const signatureRef = useRef(null);
  const [consent, setConsent] = useState(false);
  const [signatureError, setSignatureError] = useState("");
  const [consentError, setConsentError] = useState("");
  const [checkImage, setCheckImage] = useState(false);

  const convertSignatureToImage = async () => {
    try {
      const canvas = signatureRef.current.getCanvas();
      const dataUrl = canvas.toDataURL();
      const image = new Image();
      image.src = dataUrl;
      return new Promise((resolve) => {
        image.onload = () => resolve(image);
      });
    } catch (error) {
      console.error("Error converting signature to image:", error);
      return null;
    }
  };

  const handleConsentChange = () => {
    setConsent(!consent);
    setConsentError("");
  };

  const handleClearSignature = () => {
    signatureRef.current.clear();
    setSignatureError("");
  };
  const checkImageExists = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageUrl;

      image.onload = () => {
        resolve(true); // Image exists and loaded successfully
      };

      image.onerror = () => {
        resolve(false); // Image failed to load or does not exist
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!consent) {
      setConsentError("Please provide consent to use an electronic signature.");
    }
    if (signatureRef.current.isEmpty()) {
      setSignatureError("Please provide a signature.");
    }

    if (consent && !signatureRef.current.isEmpty()) {
      const signatureImage = await convertSignatureToImage();
      if (signatureImage) {
        // Here, you can store the signature image in the database
        const imageUrl = signatureImage.src;
        const imageExists = await checkImageExists(imageUrl);
        setsignatureData(imageUrl);
        setCheckImage(imageExists);
        setSignatureError("");
      } else {
        setSignatureError("Error converting signature to image.");
      }
    }
  };

  return (
    <div>
      <Typography variant="h6" align="center" sx={{ marginBottom: "1rem" }}>
        Consent Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Typography variant="body1" gutterBottom>
          To use an electronic signature, you must:
        </Typography>
        <Typography variant="body2" gutterBottom>
          1. Consent to use an electronic signature. The business must make
          certain disclosures to you before you sign.
        </Typography>
        <Typography variant="body2" gutterBottom>
          2. Have the intent to sign the document. You must agree to what’s
          written in the document you are signing and fully understand the
          implications of your signature.
        </Typography>
        <Typography variant="body2" gutterBottom>
          3. Click to accept a standard consent clause or provide an option to
          customize a consent clause.
        </Typography>
        <Typography variant="body2" gutterBottom>
          4. Sign the document electronically by drawing your signature in the
          box below.
        </Typography>
        <div
          style={{
            marginTop: "2rem",
            border: "1px solid #000000",
            padding: "0.5rem",
          }}
        >
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{
              width: 500,
              height: 100,
              className: "signature-canvas",
            }}
          />
        </div>
        {signatureError && (
          <Typography
            variant="body2"
            sx={{ color: "red", marginTop: "0.5rem" }}
          >
            {signatureError}
          </Typography>
        )}
        <div
          style={{ marginTop: "1rem", display: "flex", alignItems: "center" }}
        >
          <input
            type="checkbox"
            checked={consent}
            onChange={handleConsentChange}
          />
          <Typography variant="body2" sx={{ marginLeft: "0.5rem" }}>
            I consent to use an electronic signature.
          </Typography>
        </div>
        {consentError && (
          <Typography
            variant="body2"
            sx={{ color: "red", marginTop: "0.5rem" }}
          >
            {consentError}
          </Typography>
        )}
        {checkImage === false && (
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" onClick={handleClearSignature}>
              Clear Signature
            </Button>
            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Confirm
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Signature;
