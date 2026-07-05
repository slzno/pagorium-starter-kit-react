import { illustrations } from '@/components/icons';

/**
 * Galería de ilustraciones duotono: cada una en su tarjeta con su nombre.
 */
export default function EjemploIlustraciones() {
  return (
    <div className="bg-frame grid grid-cols-3 gap-2 rounded-4xl p-4 sm:grid-cols-6 lg:grid-cols-10">
      {Object.entries(illustrations).map(([nombre, Ilustracion]) => (
        <div key={nombre} className="bg-card flex flex-col items-center gap-2 rounded-2xl px-2 py-4">
          <Ilustracion className="size-9" />
          <span className="text-muted-foreground w-full truncate text-center text-[0.6875rem]">{nombre}</span>
        </div>
      ))}
    </div>
  );
}
