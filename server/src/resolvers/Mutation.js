import bcrypt from 'bcrypt'
import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        const password = await hashPassword(args.data.password)
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        })

        return {
            user,
            token: generateToken(user.id)
        }
    },
    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })

        if (!user) {
            throw new Error('User not found')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Incorrect email/password')
        }

        return {
            user,
            token: generateToken(user.id)
        }
    },
    deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)
    },
    async updateUser(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request)

        if (typeof data.password === 'string'){
            data.password = await hashPassword(data.password)
        }

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data
        }, info)
    },
    async createWidget(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.createWidget({
            data: {
                text: data.text,
                owner: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },
    async deleteWidget(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        const widgetExists = await prisma.exists.Widget({
            id: args.id,
            owner: {
                id: userId
            }
        })

        if (!widgetExists) {
            throw new Error('Unable to delete expense')
        }

        return prisma.mutation.deleteWidget({
            where: {
                id: args.id
            }
        }, info)
    }
}

export { Mutation as default }