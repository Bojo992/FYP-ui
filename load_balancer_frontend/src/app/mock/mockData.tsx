export var MockConfig : IConfig = {
    "clusters": [
        {
            "clusterId": "cluster1",
            "loadBalancingPolicy": "RoundRobin",
            "sessionAffinity": null,
            "healthCheck": null,
            "httpClient": null,
            "httpRequest": null,
            "destinations": {
                "destination1": {
                    "address": "http://localhost:7100",
                    "health": null,
                    "metadata": null,
                    "host": null
                },
                "destination2": {
                    "address": "http://localhost:7200",
                    "health": null,
                    "metadata": null,
                    "host": null
                }
            },
            "metadata": null
        },
        {
            "clusterId": "frontendCluster",
            "loadBalancingPolicy": null,
            "sessionAffinity": null,
            "healthCheck": null,
            "httpClient": null,
            "httpRequest": null,
            "destinations": {
                "frontend": {
                    "address": "http://localhost:3000",
                    "health": null,
                    "metadata": null,
                    "host": null
                }
            },
            "metadata": null
        }
    ],
    "routes": [
        {
            "routeId": "route1",
            "match": {
                "methods": null,
                "hosts": null,
                "path": "/test/{**catch-all}",
                "queryParameters": null,
                "headers": null
            },
            "order": null,
            "clusterId": "cluster1",
            "authorizationPolicy": null,
            "rateLimiterPolicy": null,
            "outputCachePolicy": null,
            "timeoutPolicy": null,
            "timeout": null,
            "corsPolicy": null,
            "maxRequestBodySize": null,
            "metadata": null,
            "transforms": null
        },
        {
            "routeId": "frontendRoute",
            "match": {
                "methods": null,
                "hosts": null,
                "path": "/config/{**catch-all}",
                "queryParameters": null,
                "headers": null
            },
            "order": null,
            "clusterId": "frontendCluster",
            "authorizationPolicy": null,
            "rateLimiterPolicy": null,
            "outputCachePolicy": null,
            "timeoutPolicy": null,
            "timeout": null,
            "corsPolicy": null,
            "maxRequestBodySize": null,
            "metadata": null,
            "transforms": null
        }
    ]
}