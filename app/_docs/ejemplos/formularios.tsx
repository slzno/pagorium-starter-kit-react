import { FormField, FormSection } from '@/components/kit';
import { Input } from '@/components/ui/input';

/**
 * Formulario: sección con título y ayuda, y campos con etiqueta y mensaje de error.
 */
export default function EjemploFormularios() {
  return (
    <FormSection title="Nueva persona" description="Los campos con asterisco son obligatorios.">
      <div className="bg-card grid gap-5 rounded-3xl p-5 sm:grid-cols-2">
        <FormField label="Nombre *" htmlFor="nombre">
          <Input id="nombre" placeholder="Nombre completo" />
        </FormField>
        <FormField label="Documento *" htmlFor="documento" error="El documento ya está registrado.">
          <Input id="documento" aria-invalid defaultValue="DOC-0001" />
        </FormField>
      </div>
    </FormSection>
  );
}
