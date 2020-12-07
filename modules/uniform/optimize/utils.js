/** Ensures that `$uniform.optimize` is defined on the Nuxt context object */
export function ensureUniformOptimizeContext(nuxtContext) {
  // NOTE: other $uniform plugins or modules may attach data to the Nuxt $uniform context,
  // so try to avoid using ...spread to assign data to the `$uniform.optimize` object as
  // other plugins/modules may be using Vue "reactive" data which could be impacted
  // if improperly using ...spread.
  if (!nuxtContext.$uniform || !nuxtContext.$uniform.optimize) {
    nuxtContext.$uniform = {
      optimize: {},
    };
  }
}
