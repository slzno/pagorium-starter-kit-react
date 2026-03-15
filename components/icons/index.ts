/**
 * Íconos de Pagorium Starter Kit React, con los mismos nombres que usaba Lucide para cambiarlos sin tocar las pantallas.
 * Lenguaje «línea de hoja» (ver `base.tsx`): trazo de 1,4, cuerpo en la tinta del ícono, la pieza clave en
 * el color primario y contenedores con la esquina de hoja, firma de Pagorium Starter Kit React. Las ilustraciones grandes en
 * duotono están en `illustrations.tsx`.
 */

export * from './actions';
export * from './glyphs';
export * from './illustrations';
export * from './people';
export * from './places';
export * from './records';
export * from './shortcuts';
export { type IconComponent, type IconProps } from './base';

import { CircleAlert, CircleCheck, Info, OctagonX, Search, TriangleAlert } from './actions';
import { Check, ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp, LoaderCircle, Minus, MoreHorizontal, PanelLeft, X } from './glyphs';

// Alias con los nombres que usan algunos componentes de shadcn.
export const AlertCircleIcon = CircleAlert;
export const CheckCircle2 = CircleCheck;
export const CircleCheckIcon = CircleCheck;
export const InfoIcon = Info;
export const OctagonXIcon = OctagonX;
export const SearchIcon = Search;
export const TriangleAlertIcon = TriangleAlert;
export const CheckIcon = Check;
export const ChevronDownIcon = ChevronDown;
export const ChevronLeftIcon = ChevronLeft;
export const ChevronRightIcon = ChevronRight;
export const ChevronUpIcon = ChevronUp;
export const ChevronsUpDownIcon = ChevronsUpDown;
export const Loader2Icon = LoaderCircle;
export const MinusIcon = Minus;
export const MoreHorizontalIcon = MoreHorizontal;
export const PanelLeftIcon = PanelLeft;
export const XIcon = X;
