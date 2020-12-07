import { ensureUniformOptimizeContext } from '~/modules/uniform/optimize/utils';

export default async (nuxtContext) => {
  ensureUniformOptimizeContext(nuxtContext);

  // assumes `fetch` is available in browser
  // `options.intentManifestPath` is injected via Nuxt "templated" plugin functionality.
  const intentManifest = await fetch('<%= options.intentManifestUrl %>').then((response) => response.json());

  // NOTE: other $uniform plugins or modules may attach data to the Nuxt $uniform context,
  // so let's play nice and only attach what we're responsible for.
  nuxtContext.$uniform.optimize.intentManifest = intentManifest;
};
