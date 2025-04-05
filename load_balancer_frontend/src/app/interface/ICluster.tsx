interface ICluster {
    clusterId: string | null,
    loadBalancingPolicy: string | null,
    sessionAffinity: any | null,
    healthCheck: any | null,
    httpClient: any | null,
    httpRequest: any | null,
    destinations: IDestinations,
    metadata: any | null
}