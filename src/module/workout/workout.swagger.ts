/**
 * @swagger
 * tags:
 *  name: WORKOUT
 *  description: manage workout api routes (CRUD)
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Create:
 *              type: object
 *              required:
 *                  -   name
 *                  -   repeat
 *                  -   categoryId
 *              properties:
 *                  name:
 *                      type: string
 *                      default: ''
 *                  repeat:
 *                      type: array
 *                      items:
 *                          type: string
 *                          default: ''
 *                  categoryId:
 *                      type: string
 *                      default: ''
 *                  description:
 *                      type: string
 *                      default: ''
 *          Update:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      default: ''
 *                  repeat:
 *                      type: array
 *                      items:
 *                          type: string
 *                          default: ''
 *                  sets:
 *                      type: integer
 *                      default: ''
 *                  categoryId:
 *                      type: string
 *                      default: ''
 *                  description:
 *                      type: string
 *                      default: ''
 */
/**
 * @swagger
 * /workout/create:
 *  post: 
 *      summary: create new workout
 *      tags: 
 *          -   WORKOUT
 *      requestBody:
 *          content: 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Create'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Create'
 *      responses: 
 *          201:
 *              description: created
 */
/**
 * @swagger
 * /workout/list:
 *  get: 
 *      summary: get all workouts
 *      tags: 
 *          -   WORKOUT
 *      responses: 
 *          200:
 *              description: OK
 */
/**
 * @swagger
 * /workout/{id}:
 *  get: 
 *      summary: get workout by name or id
 *      tags: 
 *          -   WORKOUT
 *      parameters: 
 *          -   in: path
 *              name: id
 *              require: true
 *      responses: 
 *          200:
 *              description: Ok
 */
/**
 * @swagger
 * /workout/byCategory/{category}:
 *  get: 
 *      summary: get workouts by name or category
 *      tags: 
 *          -   WORKOUT
 *      parameters: 
 *          -   in: path
 *              name: category
 *              require: true
 *      responses: 
 *          200:
 *              description: Ok
 */
/**
 * @swagger
 * /workout/remove/{id}:
 *  delete: 
 *      summary: delete workout by id
 *      tags: 
 *          -   WORKOUT
 *      parameters: 
 *          -   in: path
 *              name: id
 *              require: true
 *      responses: 
 *          200:
 *              description: Ok
 */
/**
 * @swagger
 * /workout/update/{id}:
 *  put: 
 *      summary: update workout
 *      tags: 
 *          -   WORKOUT
 *      parameters: 
 *          -   in: path
 *              name: id
 *              require: true
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Update'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Update'
 *      responses: 
 *          201:
 *              description: created
 */