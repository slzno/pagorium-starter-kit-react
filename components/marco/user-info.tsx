import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type MarcoUser } from './types';

/**
 * Iniciales para el avatar del usuario: primera letra del primer y del último nombre.
 *
 * @param fullName Nombre completo.
 * @return Una o dos letras en mayúscula.
 */
export function userInitials(fullName: string): string {
  const names = fullName.trim().split(/\s+/).filter(Boolean);

  if (names.length === 0) {
    return '';
  }

  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
}

/**
 * Avatar y nombre del usuario (con el correo si se pide), para el menú de usuario: círculo grande con la
 * foto o las iniciales en el color de la marca, como el avatar de la barra superior.
 *
 * @param user Usuario.
 * @param showEmail Si se muestra el correo bajo el nombre.
 */
export function UserInfo({ user, showEmail = false }: { user: MarcoUser; showEmail?: boolean }) {
  return (
    <>
      <Avatar className="size-12 shrink-0 overflow-hidden rounded-full">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="bg-accent text-primary dark:bg-primary/15 rounded-full text-base font-semibold">{userInitials(user.name)}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{user.name}</span>
        {showEmail && user.email && <span className="text-muted-foreground truncate text-xs">{user.email}</span>}
      </div>
    </>
  );
}
