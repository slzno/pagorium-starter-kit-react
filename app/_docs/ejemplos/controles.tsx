'use client';

import { FormField, PasswordInput } from '@/components/kit';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';

/**
 * Controles: casilla, interruptor, opciones, contraseña con ojo y acordeón.
 */
export default function EjemploControles() {
  return (
    <div className="bg-frame grid gap-4 rounded-4xl p-5 md:grid-cols-2">
      <div className="bg-card flex flex-col gap-4 rounded-3xl p-5">
        <Label className="flex items-center gap-3">
          <Checkbox defaultChecked /> Acepto los términos
        </Label>
        <Label className="flex items-center gap-3">
          <Switch defaultChecked /> Recibir notificaciones
        </Label>
        <RadioGroup defaultValue="lista" className="flex gap-5">
          {['Lista', 'Tarjetas', 'Tablero'].map((op) => (
            <Label key={op} className="flex items-center gap-2">
              <RadioGroupItem value={op.toLowerCase()} /> {op}
            </Label>
          ))}
        </RadioGroup>
        <FormField label="Contraseña" htmlFor="c-pass">
          <PasswordInput id="c-pass" defaultValue="secreto123" />
        </FormField>
      </div>
      <div className="bg-card rounded-3xl p-5">
        <Accordion type="single" collapsible defaultValue="a">
          <AccordionItem value="a">
            <AccordionTrigger>¿Qué es Pagorium Starter Kit React?</AccordionTrigger>
            <AccordionContent>El sistema de diseño de código abierto de Pagorium.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>¿Tiene modo oscuro?</AccordionTrigger>
            <AccordionContent>Sí: claro, oscuro y verde, con la misma jerarquía.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
