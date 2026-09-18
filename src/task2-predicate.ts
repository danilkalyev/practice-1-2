// Тип банковской транзакции (пока без interface, используем type)
export type Transaction = {
  id: string;
  amount: number;
  type: "deposit" | "withdrawal";
};

// Напишите функцию-предикат isTransaction
// Она должна проверить:
// 1. Что data - это объект и не null
// 2. Что у data есть поля id, amount, type
// 3. Что id - это строка, amount - число, type - одна из двух строк
export function isTransaction(data: unknown): data is Transaction {
  // typeof null === "object", поэтому null проверяем отдельно
  if (typeof data !== "object" || data === null) {
    return false;
  }

  // Теперь это точно объект, читаем поля как unknown и проверяем каждое
  const obj = data as Record<string, unknown>;

  return (
    typeof obj.id === "string" &&
    typeof obj.amount === "number" &&
    (obj.type === "deposit" || obj.type === "withdrawal")
  );
}

// Функция обработки. 
// Если data это транзакция - вернуть "Обработана транзакция на сумму <amount>"
// Иначе вернуть "Неизвестные данные"
export function processTransaction(data: unknown): string {
  // Внутри if компилятор знает, что data - это Transaction
  if (isTransaction(data)) {
    return `Обработана транзакция на сумму ${data.amount}`;
  }

  return "Неизвестные данные";
}
