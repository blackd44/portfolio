const toUrl = (svg: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

const toRgb = (hex: string) => {
  const m = hex.trim().match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})/i);
  if (!m) return [1, 1, 1];
  return m.slice(1).map((v) => parseInt(v, 16) / 255);
};

const sealEllipses = Array.from(
  { length: 29 },
  (_, i) => `<use href='#e' transform='rotate(${(i + 1) * 6})'/>`
).join("");

export function applyBgPatterns(color: string) {
  const [r, g, b] = toRgb(color);
  const stroke = color.trim();
  const root = document.documentElement.style;

  root.setProperty(
    "--bg-noise",
    toUrl(
      `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 .09 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
    )
  );
  root.setProperty(
    "--bg-seal",
    toUrl(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='-300 -300 600 600' fill='none' stroke='${stroke}' stroke-opacity='.09'><ellipse id='e' rx='280' ry='88'/>${sealEllipses}<circle r='96'/><circle r='102'/><circle r='288'/><circle r='296' stroke-dasharray='2 5'/></svg>`
    )
  );
  root.setProperty(
    "--bg-circuit",
    toUrl(
      `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' fill='none' stroke='${stroke}' stroke-opacity='.05'><path d='M0 30H35L45 40V75H75L85 65V40L95 30H120M20 120V95L10 85V58M20 0V7M0 100H12M120 100H100L92 92M60 75V105'/><g stroke-opacity='.06'><circle cx='10' cy='55' r='3'/><circle cx='20' cy='10' r='3'/><circle cx='15' cy='100' r='3'/><circle cx='90' cy='90' r='3'/><circle cx='60' cy='108' r='3'/></g></svg>`
    )
  );
}
