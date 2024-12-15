/**
 * @swagger
 * tags:
 *  name: CATEGORY
 *  description: manage category api routes (CRUD)
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              require:
 *                  -   name
 *              properties:
 *                  name:
 *                      type: string
 *                      default: ''
 *          UpdateCategory:
 *              type: object
 *              require:
 *                  -   name
 *              properties:
 *                  name:
 *                      type: string
 *                      default: ''
 */
/**
 * @swagger
 * /category/create:
 *  post: 
 *      summary: create new category
 *      tags: 
 *          -   CATEGORY
 *      requestBody:
 *          content: 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *      responses: 
 *          201:
 *              description: created
 */
/**
 * @swagger
 * /category/list:
 *  get: 
 *      summary: get all categories
 *      tags: 
 *          -   CATEGORY
 *      responses: 
 *          200:
 *              description: OK
 */
/**
 * @swagger
 * /category/{search}:
 *  get: 
 *      summary: get category by name or id
 *      tags: 
 *          -   CATEGORY
 *      parameters: 
 *          -   in: path
 *              name: search
 *              require: true
 *      responses: 
 *          200:
 *              description: Ok
 */
/**
 * @swagger
 * /category/remove/{id}:
 *  delete: 
 *      summary: delete category by id
 *      tags: 
 *          -   CATEGORY
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
 * /category/update/{id}:
 *  put: 
 *      summary: update category
 *      tags: 
 *          -   CATEGORY
 *      parameters: 
 *          -   in: path
 *              name: id
 *              require: true
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateCategory'
 *      responses: 
 *          201:
 *              description: created
 */