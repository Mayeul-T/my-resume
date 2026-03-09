import Link, {LinkProps} from "next/link";
import React, {PropsWithChildren} from "react";
import {buildButtonClassName, ButtonStyleProps} from "@/components/ui/Button/Button";

type LinkButtonProps = ButtonStyleProps & LinkProps & PropsWithChildren & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;

export function LinkButton({children, variant, size, shape, className, ...props}: LinkButtonProps) {
    return <Link {...props} className={buildButtonClassName({variant, size, shape, className})}>{children}</Link>
}
