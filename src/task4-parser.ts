// Используем тип Transaction из прошлого задания (или скопируйте его сюда)
export type Transaction = {
  id: string;
  amount: number;
  type: "deposit" | "withdrawal";
};

// 1. Напишите предикат isTransaction (можно скопировать из task2)
export function isTransaction(data: unknown): data is Transaction {
  // typeof null === "object", поэтому null проверяем отдельно
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return (
    typeof obj.id === "string" &&
    typeof obj.amount === "number" &&
    (obj.type === "deposit" || obj.type === "withdrawal")
  );
}

// 2. Напишите функцию parseTransactions
// Принимает массив unknown[]
// Возвращает объект { valid: Transaction[], errors: string[] }
// Логика: пройтись по массиву. Если isTransaction(item) - добавить в valid.
// Иначе - добавить строку "Invalid item: <item>" в errors.
export function parseTransactions(rawData: unknown[]): { valid: Transaction[]; errors: string[] } {
  const valid: Transaction[] = [];
  const errors: string[] = [];

  for (const item of rawData) {
    // Предикат сужает item до Transaction, поэтому push проходит проверку типов
    if (isTransaction(item)) {
      valid.push(item);
    } else {
      errors.push(`Invalid item: ${String(item)}`);
    }
  }

  return { valid, errors };
}

// 3. Напишите функцию calculateBalance
// Принимает массив валидных транзакций.
// deposit прибавляет amount, withdrawal вычитает.
export function calculateBalance(transactions: Transaction[]): number {
  let balance = 0;

  for (const transaction of transactions) {
    if (transaction.type === "deposit") {
      balance += transaction.amount;
    } else {
      balance -= transaction.amount;
    }
  }

  return balance;
}
