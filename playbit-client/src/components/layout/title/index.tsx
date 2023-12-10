import React from "react";
import { useRouterContext, TitleProps } from "@refinedev/core";
import Button from "@mui/material/Button";

import { logo, playbit } from "assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const { Link } = useRouterContext();

    return (
        <Button fullWidth variant="text" disableRipple>
            <Link to="/">
                {collapsed ? (
                    <img src={logo} alt="playbit" width="28px" />
                ) : (
                    <img src={playbit} alt="Refine" width="140px" />
                )}
            </Link>
        </Button>
    );
};
