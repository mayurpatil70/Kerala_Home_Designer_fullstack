"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { mapEmbedSrc, mapLinkHref } from "@/content/site";

/**
 * Google Map of the office address. Loads only when the visitor asks for it, so
 * the page stays fast and no third-party content loads without consent.
 */
export default function MapEmbed() {
  const [show, setShow] = useState(false);
  return (
    <div className="map">
      {show ? (
        <iframe src={mapEmbedSrc} title="Map showing The Home Designers office location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <div className="map__placeholder">
          <svg viewBox="0 0 400 220" aria-hidden="true" className="map__art">
            <path d="M0 160C80 140 120 180 200 150S320 90 400 110" />
            <path d="M0 60C100 80 160 30 240 60S340 120 400 70" />
            <path d="M120 0V220M290 0V220" />
            <path className="map__pin" d="M200 70c-14 0-24 10-24 24 0 18 24 42 24 42s24-24 24-42c0-14-10-24-24-24z" />
            <circle cx="200" cy="94" r="8" className="map__dot" />
          </svg>
          <p>The map is provided by Google Maps and loads only when you choose to view it.</p>
          <div className="map__actions">
            <Button variant="sky" arrow={false} onClick={() => setShow(true)}>Show map</Button>
            <Button variant="ghost" href={mapLinkHref}>Open in Google Maps</Button>
          </div>
        </div>
      )}
    </div>
  );
}
