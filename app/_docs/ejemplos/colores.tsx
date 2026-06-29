/** Tokens de color que se muestran en la paleta. */
const TOKENS = ['background', 'frame', 'card', 'muted', 'field', 'border', 'primary', 'secondary', 'icon', 'destructive', 'foreground', 'muted-foreground'];

/**
 * Paleta: una muestra por token de color; cada una lee su variable, así cambia sola en oscuro y en el tema verde.
 */
export default function EjemploColores() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
      {TOKENS.map((token) => (
        <div key={token} className="bg-frame flex flex-col gap-2 rounded-3xl p-3">
          <div className="ring-foreground/10 h-16 rounded-2xl ring-1" style={{ background: `var(--${token})` }} />
          <code className="text-xs">--{token}</code>
        </div>
      ))}
    </div>
  );
}
