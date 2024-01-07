
const schema = {
    "context": 'http://denotech.web5/userprofile',
    get uri() { return this.context ; }
}

const protocolDefinition = {
    protocol: "http://dennotech.web5",
    published: true,
    types: {
        profile: {
            schema: schema.uri,
            dataFormats: ["application/json"]
        },
        shared: {
            "schema": schema.uri,
            "dataFormats": ["application/json"]
        },
    },
    structure: {
        profile: {
            $actions: [
                {
                    who: "anyone",
                    can: "read"
                },
                {
                    who: "anyone",
                    can: "write"
                }
            ],

        },
        shared: {
            $actions: [
                {
                    who: "anyone",
                    can: "read"
                },
                {
                    who: "anyone",
                    can: "write"
                }
            ]
        }
    }
}

export default protocolDefinition;