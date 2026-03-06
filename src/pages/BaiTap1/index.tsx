import React, { useState } from 'react';
import { Card, Input, Button, Typography } from 'antd';

const { Text } = Typography;

const BaiTap1: React.FC = () => {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );

  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = () => {
    const number = Number(guess);

    if (!number || number < 1 || number > 100) {
      setMessage('⚠️ Hãy nhập số từ 1 đến 100');
      return;
    }

    if (number === randomNumber) {
      setMessage('🎉 Chúc mừng! Bạn đã đoán đúng!');
      setGameOver(true);
      return;
    }

    if (number < randomNumber) {
      setMessage('Bạn đoán quá thấp!');
    } else {
      setMessage('Bạn đoán quá cao!');
    }

    const newAttempts = attempts - 1;
    setAttempts(newAttempts);

    if (newAttempts === 0) {
      setMessage(`Bạn đã hết lượt! Số đúng là ${randomNumber}`);
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(10);
    setMessage('');
    setGameOver(false);
  };

  return (
    <Card title="Game đoán số (1 - 100)" style={{ width: 420 }}>
      <p>Lượt còn lại: {attempts}</p>

      <Input
        placeholder="Nhập số từ 1 đến 100"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onPressEnter={handleGuess}
        disabled={gameOver}
      />

      <br />
      <br />

      <Button type="primary" onClick={handleGuess} disabled={gameOver} block>
        Đoán
      </Button>

      <br />
      <br />

      {message && <Text strong>{message}</Text>}

      <br />
      <br />

      {gameOver && (
        <Button onClick={restartGame} block>
          Chơi lại
        </Button>
      )}
    </Card>
  );
};

export default BaiTap1;