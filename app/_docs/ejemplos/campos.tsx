'use client';

import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

/**
 * Campos: texto, select, select nativo, fecha y área de texto, con el mismo alto que los botones.
 */
export default function EjemploCampos() {
  return (
    <div className="bg-frame grid gap-4 rounded-4xl p-5 sm:grid-cols-2 lg:grid-cols-4">
      <Input placeholder="Texto libre" />
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Elija una opción" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Opción A</SelectItem>
          <SelectItem value="b">Opción B</SelectItem>
        </SelectContent>
      </Select>
      <NativeSelect defaultValue="">
        <option value="" disabled>
          Select nativo
        </option>
        <option>Uno</option>
        <option>Dos</option>
      </NativeSelect>
      <Input type="date" />
      <Textarea className="sm:col-span-2 lg:col-span-4" placeholder="Observaciones" />
    </div>
  );
}
