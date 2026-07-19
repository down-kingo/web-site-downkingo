/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace astroHTML.JSX {
  interface FormHTMLAttributes {
    toolname?: string;
    tooldescription?: string;
    toolautosubmit?: boolean;
  }

  interface SelectHTMLAttributes {
    toolparamdescription?: string;
  }
}
