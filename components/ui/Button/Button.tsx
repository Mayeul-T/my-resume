import React from "react";

export const buttonVariantsClassname : {glass: string} = {
    glass: 'inline-flex items-center glass-blur glass-hover font-semibold text-foreground'
}

export type ButtonVariant = keyof typeof buttonVariantsClassname;
export type ButtonSize = 'large' | 'small';
export type ButtonShape = 'square' | 'regular';


const buttonShapeClassname : {[k in ButtonShape]: {
    [l in ButtonSize]: string
}} = {
    regular: {
        small: 'px-4 py-2 rounded-lg gap-1',
        large: 'px-7 py-3.5 rounded-xl gap-2',
    },
    square: {
        small: 'p-2 rounded-lg',
        large: 'p-3.5 rounded-xl',
    },
};

export interface ButtonStyleProps{
    variant?: ButtonVariant;
    size?: ButtonSize;
    shape?: ButtonShape;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps

export function buildButtonClassName({variant='glass', size='large', shape='regular', className}: ButtonProps) {
    return `${buttonVariantsClassname[variant]} ${buttonShapeClassname[shape][size]} ${className || ''} hover:cursor-pointer`
}

export function Button({children, variant='glass', size='large', shape='regular', className, ...props}: ButtonProps) {
    return <button
        {...props}
        className={buildButtonClassName({variant, size, shape, className: `${className || ''} hover:cursor-pointer`})}
    >{children}</button>
}