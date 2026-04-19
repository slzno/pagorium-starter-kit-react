'use client';

import { useCallback, useSyncExternalStore } from 'react';

/** Apariencia elegida: clara, oscura o la del sistema operativo. */
export type Appearance = 'light' | 'dark' | 'system';

/** Clave de `localStorage` donde se recuerda la apariencia. */
export const APPEARANCE_STORAGE_KEY = 'marco-appearance';

const listeners = new Set<() => void>();

/**
 * Lee la apariencia guardada en el navegador; sin almacenamiento, la del sistema.
 *
 * @return La apariencia guardada.
 */
function readAppearance(): Appearance {
  try {
    const value = window.localStorage.getItem(APPEARANCE_STORAGE_KEY);

    return value === 'light' || value === 'dark' ? value : 'system';
  } catch {
    return 'system';
  }
}

/**
 * Indica si el sistema operativo pide el tema oscuro.
 *
 * @return Verdadero si prefiere oscuro.
 */
function systemPrefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Pone o quita la clase `dark` del `<html>` y ajusta `color-scheme` según la apariencia.
 *
 * @param appearance Apariencia a aplicar.
 */
export function applyAppearance(appearance: Appearance): void {
  const isDark = appearance === 'dark' || (appearance === 'system' && systemPrefersDark());

  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
}

/**
 * Suscribe a los cambios de apariencia (de esta pestaña, de otras pestañas y del sistema operativo).
 *
 * @param listener Función que se avisa en cada cambio.
 * @return Función para cancelar la suscripción.
 */
function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onSystem = () => {
    if (readAppearance() === 'system') {
      applyAppearance('system');
    }
    listener();
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === APPEARANCE_STORAGE_KEY) {
      applyAppearance(readAppearance());
      listener();
    }
  };

  media.addEventListener('change', onSystem);
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(listener);
    media.removeEventListener('change', onSystem);
    window.removeEventListener('storage', onStorage);
  };
}

/**
 * Apariencia del sistema con su cambio: la guarda en `localStorage`, la aplica al instante con la clase
 * `dark` del `<html>` y avisa a todos los componentes que la usan. `resolved` dice si se ve clara u oscura.
 *
 * @return La apariencia elegida, la que se ve y la función para cambiarla.
 */
export function useAppearance(): {
  appearance: Appearance;
  resolved: 'light' | 'dark';
  updateAppearance: (appearance: Appearance) => void;
} {
  const appearance = useSyncExternalStore(subscribe, readAppearance, () => 'system' as Appearance);
  const prefersDark = useSyncExternalStore(subscribe, systemPrefersDark, () => false);
  const resolved = appearance === 'dark' || (appearance === 'system' && prefersDark) ? 'dark' : 'light';

  const updateAppearance = useCallback((next: Appearance) => {
    try {
      window.localStorage.setItem(APPEARANCE_STORAGE_KEY, next);
    } catch {
      // Sin almacenamiento, el cambio dura hasta recargar.
    }
    applyAppearance(next);
    listeners.forEach((listener) => listener());
  }, []);

  return { appearance, resolved, updateAppearance };
}
