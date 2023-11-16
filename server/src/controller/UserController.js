import { PrismaClient } from '@prisma/client';
import { SerialPort } from 'serialport';
import { getRfidCode } from './RfidController.js';

const prisma = new PrismaClient();

export default {
  async createUser(req, res) {
    try {
      const { name } = req.body;

      const rfidCode = await getRfidCode();

      const user = await prisma.user.create({
        data: {
          name,
          rfidCode,
        },
      });

      return res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },

  async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany();

      return res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  },

  async getUser(req, res) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      return res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const rfidCode = await getRfidCode();

      const user = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          rfidCode,
        },
      });

      return res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });

      return res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
}
