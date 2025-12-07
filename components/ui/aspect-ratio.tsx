'use client';

import { AspectRatio as AspectRatioPrimitive } from 'radix-ui';

/** Contenedor que mantiene una relación de aspecto fija. */
function AspectRatio({ ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
}

export { AspectRatio };
