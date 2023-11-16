import { PrismaClient } from '@prisma/client';
import { SerialPort } from 'serialport';
import { getRfidCode } from './RfidController.js';

const prisma = new PrismaClient();

export default {
  async createAcess (req, res) {
    try {
      const rfidCode = await getRfidCode();

      const user = await prisma.user.findUnique({
        where: {
          rfidCode: rfidCode,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const newAcess = await prisma.acessLog.create({
       data: {
         userId: user.id,
       },
      })

      return res.json(newAcess);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar acesso' });
    }
  }

}