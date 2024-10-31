import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { CSSProperties } from 'react';

interface CustomButtonProps extends AntButtonProps {
    containerStyle?: CSSProperties;
    textStyle?: CSSProperties;
    children?: React.ReactNode;
}

const Button: React.FC<CustomButtonProps> = ({
    containerStyle,
    textStyle,
    children,
    ...props
}) => {
    return (
        <div style={{ display: 'inline-block', ...containerStyle }}>
            <AntButton {...props} style={{ ...props.style }}>
                <span style={{ ...textStyle }}>{children}</span>
            </AntButton>
        </div>
    );
};

export default Button;
