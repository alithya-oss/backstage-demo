import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
  ScmAuth,
} from '@backstage/integration-react';
import {
  AnyApiFactory,
  configApiRef,
  createApiFactory,
} from '@backstage/core-plugin-api';
import { githubAuthApiRef } from '@backstage/core-plugin-api';
import { cicdStatisticsApiRef } from '@backstage-community/plugin-cicd-statistics';
import { CicdStatisticsApiGithub } from '@backstage-community/plugin-cicd-statistics-module-github';

export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: cicdStatisticsApiRef,
    deps: {
      githubAuthApi: githubAuthApiRef,
      configApi: configApiRef,
    },
    factory: ({ githubAuthApi, configApi }) => {
      return new CicdStatisticsApiGithub(githubAuthApi, configApi);
    },
  }),
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),
  ScmAuth.createDefaultApiFactory(),
];
