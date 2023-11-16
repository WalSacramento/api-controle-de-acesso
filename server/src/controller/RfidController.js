import { SerialPort } from 'serialport';

const serialPort = new SerialPort({ path: 'COM3', baudRate: 9600 });

export const getRfidCode = () => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject('timeout');
    }, 10000); // tempo limite de 10 segundos

    serialPort.write('A');
    serialPort.on('data', function (data) {
      clearTimeout(timeout);
      resolve(data.toString());
    });
  });
}