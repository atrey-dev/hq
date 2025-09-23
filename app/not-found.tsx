import fs from "node:fs";
import path from "node:path";

export default function NotFound() {
  let art = "";
  try {
    art = fs.readFileSync(path.join(process.cwd(), "public", "ascii-art.txt"), "utf8");
  } catch {}
  return (
    <div
      style={{
        height: '100svh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        background: '#000',
      }}
    >
      <pre
        style={{
          whiteSpace: 'pre',
          margin: 0,
          color: '#fff',
          fontSize: 'clamp(10px, 2.5vw, 20px)',
          lineHeight: 1,
          fontFamily: 'monospace',
          maxHeight: '100svh',
          width: '100vw',
          minWidth: 0,
          overflowY: 'hidden',
          overflowX: 'hidden',
          display: 'block',
        }}
      >
        {art || '404'}
      </pre>
    </div>
  );
}


