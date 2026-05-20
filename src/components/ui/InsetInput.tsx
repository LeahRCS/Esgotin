import React from 'react';

interface InsetInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const InsetInput = React.forwardRef<HTMLInputElement, InsetInputProps>(
  ({ hasError, className, ...props }, ref) => (
    <input
      ref={ref}
      className={`input-inset ${hasError ? 'error' : ''} ${className ?? ''}`}
      {...props}
    />
  )
);
InsetInput.displayName = 'InsetInput';

interface InsetTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const InsetTextarea = React.forwardRef<HTMLTextAreaElement, InsetTextareaProps>(
  ({ hasError, className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={`input-inset ${hasError ? 'error' : ''} ${className ?? ''}`}
      {...props}
    />
  )
);
InsetTextarea.displayName = 'InsetTextarea';
