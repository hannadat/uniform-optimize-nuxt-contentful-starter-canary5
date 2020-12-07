import { ensureUniformOptimizeContext } from '~/modules/uniform/optimize/utils';

export default async (nuxtContext) => {
  ensureUniformOptimizeContext(nuxtContext);

  // `options.componentResolverPath` is injected via Nuxt "templated" plugin functionality.
  // IMPORTANT: the _final_ value of the dynamic `import()` must be a static-analyzable path in order for webpack to
  // properly analyze and import the specified module, e.g. import('~/components/componentResolver')
  // If the value is some computed value, e.g. import(something + '/path') or import(decodeURIComponent('some%2Fvalue')),
  // then webpack will not be able analyze the path and the module will _not_ be included in the build.
  const componentResolver = await import('<%= options.componentResolverPath %>').then(
    (mod) => mod.componentResolver
  );

  // NOTE: other $uniform plugins or modules may attach data to the Nuxt $uniform context,
  // so let's play nice and only attach what we're responsible for.
  nuxtContext.$uniform.optimize.componentResolver = componentResolver;
};
