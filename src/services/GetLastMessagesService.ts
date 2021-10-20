import prismaClient from "../prisma";

class GetLastMessagesService {
    async exe() {
        const messages = await prismaClient.message.findMany({
            take: 3,
            orderBy: {
                created_at: "desc"
            },
            include: {
                user: true
            }
        });

        return messages;
    }
}

export { GetLastMessagesService };