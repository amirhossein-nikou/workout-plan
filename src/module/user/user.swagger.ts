/**
 * @swagger
 * tags:
 *  name: USER
 *  description: user api routes
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Register:
 *              type: object
 *              required:
 *                  -   firstname
 *                  -   lastname
 *                  -   email
 *                  -   password
 *                  -   confirmPassword
 *              properties:
 *                  firstname:
 *                      type: string
 *                      default: ''
 *                  lastname:
 *                      type: string
 *                      default: ''
 *                  email:
 *                      type: string
 *                      default: ''
 *                  password:
 *                      type: string
 *                      default: ''
 *                  confirmPassword:
 *                      type: string
 *                      default: ''
 *          Login:
 *              type: object
 *              required:
 *                  -   email
 *                  -   password
 *              properties:
 *                  email:
 *                      type: string
 *                      default: ''
 *                  password:
 *                      type: string
 *                      default: ''
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateUser:
 *              type: object
 *              properties:
 *                  firstname:
 *                      type: string
 *                      default: ''
 *                  lastname:
 *                      type: string
 *                      default: ''
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateEmail:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      default: ''
 *                  code:
 *                      type: string
 *                      default: ''
 */
/**
 * @swagger
 * /user/register:
 *  post: 
 *      summary: register new user
 *      tags: 
 *          -   USER
 *      requestBody:
 *          content: 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Register'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Register'
 *      responses: 
 *          201:
 *              description: created
 */
/**
 * @swagger
 * /user/login:
 *  post: 
 *      summary: login to your account
 *      tags: 
 *          -   USER
 *      requestBody:
 *          content: 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses: 
 *          201:
 *              description: created
 */
/**
 * @swagger
 * /user/update:
 *  put: 
 *      summary: update user
 *      tags: 
 *          -   USER
 *      requestBody:
 *          content: 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUser'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUser'
 *      responses: 
 *          201:
 *              description: created
 */
/**
 * @swagger
 * /user/updateEmail:
 *  put: 
 *      summary: change your email
 *      tags: 
 *          -   USER
 *      requestBody:
 *          content: 
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateEmail'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateEmail'
 *      responses: 
 *          201:
 *              description: created
 */
/**
 * @swagger
 * /user/profile:
 *  get: 
 *      summary: show user profile
 *      tags: 
 *          -   USER
 *      responses: 
 *          200:
 *              description: created
 */
/**
 * @swagger
 * /user/sendEmailOtp:
 *  post: 
 *      summary: send email otp
 *      parameters:
 *          -   in: query
 *              name: method
 *              schema:
 *                  type: string
 *                  enum: ['VERIFY','UPDATE']
 *              required: true
 *      tags: 
 *          -   USER
 *      responses: 
 *          200:
 *              description: created
 */
/**
 * @swagger
 * /user/verifyEmail/{code}:
 *  patch: 
 *      summary: verify email
 *      parameters:
 *          -   in: path
 *              name: code
 *              type: string
 *              required: true
 *      tags: 
 *          -   USER
 *      responses: 
 *          200:
 *              description: created
 */