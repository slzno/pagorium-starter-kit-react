import { type IconComponent, type IconProps as SvgIconProps } from '@/components/icons';
import { cn } from '@/lib/utils';

/**
 * Muestra un ícono del sistema a 16 px.
 *
 * @param iconNode Componente del ícono.
 * @param className Clases adicionales.
 * @param props Props del SVG.
 */
export function Icon({ iconNode: IconNode, className, ...props }: Omit<SvgIconProps, 'ref'> & { iconNode: IconComponent }) {
  return <IconNode className={cn('h-4 w-4', className)} {...props} />;
}
