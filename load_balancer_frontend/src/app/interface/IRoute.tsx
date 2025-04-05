interface IRoute {
    routeId: string,
    match: {
        methods: any | null,
        hosts: any | null,
        path: string | null,
        queryParameters: any | null,
        headers: any | null
    },
    order: any | null,
    clusterId: string | null,
    authorizationPolicy: any | null,
    rateLimiterPolicy: any | null,
    outputCachePolicy: any | null,
    timeoutPolicy: any | null,
    timeout: any | null,
    corsPolicy: any | null,
    maxRequestBodySize: any | null,
    metadata: any | null,
    transforms: any | null
}