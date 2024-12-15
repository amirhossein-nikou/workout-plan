import {Express} from 'express'
import swaggerJSDoc, {} from 'swagger-jsdoc'
import {serve, setup} from 'swagger-ui-express'
export function swaggerConfig(app:Express){
    const swaggerDoc = swaggerJSDoc({
        swaggerDefinition: {
            openapi: "3.1.0",
            info: {
                version: '1.0.0',
                title: "workout",
                description: 'manage workout api'
            },
            components: {
                securitySchemes: {
                    BearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT"
                    }
                }
            },
            security: [{ BearerAuth: [] }]
        },
        apis: [
            'src/module/**/*.swagger.ts'
        ]
    })
    const swaggerUi = setup(swaggerDoc, {})
    app.use('/swagger',serve,swaggerUi)
}